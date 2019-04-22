module.exports = class Data{

    constructor(
        id,
        temperature,
        hour,
        gps,
        device,
        node
    ) {
       this.id = id;
       this.temperature = temperature;
       this.hour = hour;
       this.gps = gps;
       this.device = device;
       this.node = node;
    }
}