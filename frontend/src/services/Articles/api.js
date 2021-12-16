import { XHTTP } from "../";

export class Api {
    static END_POINTS = {
        articles: (id) => id || "api/articles",
        article: (slug) => `api/articles/${slug}`,
    };

    static get(accessToken, id, params = {}) {
        let url = Api.END_POINTS.articles(id);

        if (!id) {
            if (params.categories) {
                params.categories.forEach((value) => {
                    url += `&category[]=${value}`;
                });
            }

            if (params.tags) {
                params.tags.forEach((value) => {
                    url += `&tags[]=${value['@id']}`;
                });
            }

            if (params.vehicleModels) {
                params.vehicleModels.forEach((value) => {
                    url += `&vehicleModels[]=${value['@id']}`;
                });
            }

            url = url.replace('&', '?');
        }

        return XHTTP(url, {
            method: "get",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
    }

    static getAssociatedArticles(accessToken, id) {
        return XHTTP(`${id}/associated-articles`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
    }

    static getOne(accessToken, slug) {
        return XHTTP(Api.END_POINTS.article(slug), {
            method: "get",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
    }

    static getTags(accessToken) {
        return XHTTP("api/tags", {
            method: "get",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
    }

    static getVehicles(accessToken) {
        return XHTTP("api/vehicle-models", {
            method: "get",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
    }
}
