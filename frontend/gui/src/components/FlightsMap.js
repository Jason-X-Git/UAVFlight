import React, {useEffect, useState} from "react";
import esriLoader from "esri-loader";
import {makeStyles} from "@material-ui/core/styles";
import selectFlights from "../selector/selectFlights";
import {connect} from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const statusTypes = {
    RUNNING: "RUNNING",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    STOPPED: "STOPPED",
};

const colorTypes = {};
colorTypes[statusTypes.RUNNING] = "blue";
colorTypes[statusTypes.SUCCESS] = "green";
colorTypes[statusTypes.FAILURE] = "red";
colorTypes[statusTypes.STOPPED] = "brown";

const useStyles = makeStyles((theme) => ({
    mapDiv: {
        // float: "left",
        width: "90%",
        minWidth: "90%",
        // height: "600px",
        margin: "10px 0 10px 0 ",
        padding: "5px 0"
    },
    // baseGalleryDiv: {
    //     width: "10%",
    // }
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectCell: {
        margin: '0 30px',
        fontSize: 15,
        fontWeight: 'bold'
    }
}));


const MapView = (props) => {

    const flights = props.flights;


    const [mapHeight, setMapHeight] = useState('60vh');
    const [center, setCenter] = useState({
        uav_no: '', longitude: '-115', latitude: '55', zoom: 5
    });

    const classes = useStyles();

    const flightsFiltered = flights.filter((flight) => flight.latitude && flight.longitude);

    const loadData = async (flights) => {
        try {
            const options = {
                url: "https://js.arcgis.com/4.15/init.js",
                css: "https://js.arcgis.com/4.15/esri/themes/light/main.css",
            };
            const [Map,
                MapView,
                CoordinateConversion,
                Search,
                Graphic,
                GraphicsLayer,
                BasemapGallery,
                Expand] = await esriLoader
                .loadModules(
                    [
                        "esri/Map",
                        "esri/views/MapView",
                        "esri/widgets/CoordinateConversion",
                        "esri/widgets/Search",
                        "esri/Graphic",
                        "esri/layers/GraphicsLayer",
                        "esri/widgets/BasemapGallery",
                        "esri/widgets/Expand"
                    ],
                    options
                );

            const map = new Map({
                basemap: "streets",
            });

            const view = new MapView({
                container: "mapDiv",
                map: map,
                center: [center.longitude, center.latitude],
                zoom: center.zoom,
            });

            view.constraints = {
                minScale: 50000000,  // User cannot zoom out beyond a scale of 1:500,000
            };

            // const basemapToggle = new BasemapToggle({
            //     view: view,
            //     nextBasemap: "satellite",
            // });
            //
            // view.ui.add(basemapToggle, "bottom-right");

            const basemapGallery = new BasemapGallery({
                view: view,
                // container: "baseGalleryDiv",
                activeBasemap: "satellite",
            });

            const bgExpand = new Expand({
                view: view,
                content: basemapGallery
            });

            view.ui.add(bgExpand, "bottom-right");

            const coordinateConversionWidget = new CoordinateConversion({
                view: view,
            });
            const searchWidget = new Search({
                view: view,
            });

            view.ui.components = ["attribution", "compass", "zoom"];

            view.ui.add(coordinateConversionWidget, {
                position: "bottom-left",
                index: 0,
            });
            view.ui.add(searchWidget, {position: "top-right", index: 1});

            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);

            const addPoint = (point) => {
                // console.log(`Adding point ${point.uav_no} ${point.latitude} ${point.longitude}`);
                const simpleMarkerSymbol = {
                    type: "simple-marker",
                    color: point.latest_status ? colorTypes[point.latest_status] : 'black', // orange
                    outline: {
                        color: [255, 255, 255], // white
                        width: 1,
                    },
                };
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                });

                const textGraphic = new Graphic({
                    geometry: point,
                    symbol: {
                        type: "text",
                        color: [25, 25, 25],
                        haloColor: [255, 255, 255],
                        haloSize: "2px",
                        text: point.uav_no,
                        xoffset: 0,
                        yoffset: -25,
                        font: {
                            size: 12,
                            weight: "bolder",
                        },
                    },
                });

                graphicsLayer.add(pointGraphic);
                graphicsLayer.add(textGraphic);
            };


            flights.map((point) => point.longitude && point.latitude && addPoint(point));
        } catch (e) {
            console.error(e)
        }
    };

    useEffect(() => {
        // console.log("useEffect ran !");
        loadData(flightsFiltered);
    }, [flightsFiltered, mapHeight, center]);

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="select-map-label">Select Map Height</InputLabel>
                <Select className={classes.selectCell}
                        id="select-map-sizer"
                        value={mapHeight}
                        onChange={(e) => setMapHeight(e.target.value)}
                >
                    <MenuItem value={'0'}>UAV Flights Map - Off</MenuItem>
                    <MenuItem value={'60vh'}>UAV Flights Map - Small</MenuItem>
                    <MenuItem value={'90vh'}>UAV Flights Map - Large</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl} disabled={mapHeight === '0'}>
                <InputLabel id="select-uav-label">Zoom to UAV Flight</InputLabel>
                <Select className={classes.selectCell}
                        id='select-flight'
                        onChange={(e) => {
                            // console.log('e value: ', e.target.value);
                            const uav_no = e.target.value;
                            const flight = flights.find(f => f.uav_no === uav_no);
                            setCenter({
                                uav_no: flight.uav_no,
                                longitude: flight.longitude,
                                latitude: flight.latitude,
                                zoom: 15
                            });
                        }
                        }
                        value={center.uav_no}
                >
                    {flightsFiltered.map((flight) => <MenuItem key={flight.uav_no}
                                                               value={flight.uav_no}>
                        {flight.uav_no}</MenuItem>)}
                </Select>
            </FormControl>

            <div id="mapDiv" className={classes.mapDiv} style={{height: mapHeight}}></div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        flights: selectFlights(state.flights, state.filters)
    };
};

export default connect(mapStateToProps)(MapView);

