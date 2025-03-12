import {Axios} from "axios";

export default function locale() {
    async function getLocales() {
        return await Axios.get("...url...").then((response)=> {
            return response.data;
        });
    }
    return {getLocales};
}