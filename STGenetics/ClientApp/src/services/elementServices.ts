import axios, { AxiosResponse } from 'axios';
import { ElementEntity } from '../domain/entity/elementEntity';

export default class ElementServices {

    public static get Headers() {
        return  {
            'Content-Type': 'application/json;charset=utf-8'
        };
    }

    private static API_LIST: string = "api/main/list";
    private static API_CREATE: string = "api/main/create";
    private static API_UPDATE: string = "api/main/update";
    private static API_DELETE: string = "api/main/delete/";

    public static async getElements(): Promise<AxiosResponse> {
        let me = this;
        return await axios.get(me.API_LIST);
    }

    public static async createElement(element: ElementEntity): Promise<AxiosResponse>  {
        let me = this;
        const response = await axios.post(me.API_CREATE, element, {
            headers: me.Headers
        });
        return response;
    }

    public static async updateElement(element: ElementEntity): Promise<AxiosResponse> {
        let me = this;
        const response = await axios.put(me.API_UPDATE, element, {
            headers: me.Headers
        });
        return response;
    }

    public static async deleteElement(element: ElementEntity): Promise<AxiosResponse>  {
        let me = this;
        const response = await axios.delete(me.API_DELETE + element.id, {
            headers: me.Headers
        });
        return response;
    }
}
