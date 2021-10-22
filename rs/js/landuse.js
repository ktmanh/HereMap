//define after map
provider = map.getBaseLayer().getProvider();

function hightLightHosp() {
    var arrLanduse = ["landuse.aerodrome", "landuse.beach", "landuse.builtup", "landuse.forest", "landuse.glacier", "landuse.golf", "landuse.hospital", "landuse.military", "landuse.national_park", "landuse.nature_reserve", "landuse.park", "landuse.pedestrian", "landuse.runway", "landuse.university", "landuse.wood"];
    var colorLanduse = {
        aerodrome: "#1a73e8",
        beach: "#9cc0f9",
        builtup: "",
        forest: "#34a853",
        golf: "#a8dab5",
        hospital: "#f06292",
        military: "#ea4335",
        national_park: "",
        nature_reserve: "#9dd5ac",
        park: "#a8dab5",
        pedestrian: "",
        runway: "#fcd36b",
        university: "#f1f3f4",
        wood: ""
    }
//doi mau benh vien,khu cong nghiep, cong vien, 
    var providerStyle = provider.getStyle();
    var providerConfig = providerStyle.extractConfig(arrLanduse);
    providerConfig.layers.landuse.aerodrome.draw.polygons.color = colorLanduse.aerodrome;
    providerConfig.layers.landuse.beach.draw.polygons.color = colorLanduse.beach;
    providerConfig.layers.landuse.forest.draw.polygons.color = colorLanduse.forest;
    providerConfig.layers.landuse.golf.draw.polygons.color = colorLanduse.golf;
    providerConfig.layers.landuse.hospital.draw.polygons.color = colorLanduse.hospital;
    providerConfig.layers.landuse.military.draw.polygons.color = colorLanduse.military;
    providerConfig.layers.landuse.nature_reserve.draw.polygons.color = colorLanduse.nature_reserve;
    providerConfig.layers.landuse.park.draw.polygons.color = colorLanduse.park;
    providerConfig.layers.landuse.pedestrian.draw.polygons.color = colorLanduse.pedestrian;
    providerConfig.layers.landuse.runway.draw.polygons.color = colorLanduse.runway;
    providerConfig.layers.landuse.university.draw.polygons.color = colorLanduse.university;
    providerStyle.mergeConfig(providerConfig);
}