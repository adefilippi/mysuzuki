export class Utils {
    static getLocalityFromAdressComponents(place) {
        if (!place || !place.address_components) return null;
        const ac = place.address_components;
        let locality = null;
        ac.map((c) => {
            if (c.types.includes("locality")) locality = c.long_name;
        });
        return locality;
    }
}
