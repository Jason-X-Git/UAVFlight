import React, {useEffect, useState} from "react";
import esriLoader from "esri-loader";
import {makeStyles} from "@material-ui/core/styles";
import selectFlights from "../selector/selectFlights";
import {connect} from "react-redux";

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
        height: "600px",
        margin: "10px 0 10px 0 ",
        padding: "5px 0"
    },
    // baseGalleryDiv: {
    //     width: "10%",
    // }
}));

const MapView = (props) => {

    const flights = props.flights;


    const [display, setDisplay] = useState(true);

    const classes = useStyles();

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
                BasemapGallery] = await esriLoader
                .loadModules(
                    [
                        "esri/Map",
                        "esri/views/MapView",
                        "esri/widgets/CoordinateConversion",
                        "esri/widgets/Search",
                        "esri/Graphic",
                        "esri/layers/GraphicsLayer",
                        "esri/widgets/BasemapGallery"
                    ],
                    options
                );

            const map = new Map({
                basemap: "streets",
            });

            const view = new MapView({
                container: "mapDiv",
                map: map,
                center: [-115, 55],
                zoom: 5,
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
            view.ui.add(basemapGallery, "bottom-right");

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
                console.log(`Adding point ${point.uav_no} ${point.latitude} ${point.longitude}`);
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

            flights.map((point) => addPoint(point));
        } catch (e) {
            console.error(e)
        } finally {
            console.log('Cannot load ArcGIS Javascript API stuff !')
        }
    };

    useEffect(() => {
        console.log("useEffect ran !");
        loadData(flights);
    }, [flights, display]);

    return (
        <div>
            < input type="submit" value={!display ? "Show Flights Map" : "Hide Flights Map"}
                    onClick={() => setDisplay(!display)}></input>
            {display ?
                <div id="mapDiv" className={classes.mapDiv}></div>
                : null
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        flights: selectFlights(state.flights, state.filters)
    };
};

export default connect(mapStateToProps)(MapView);

