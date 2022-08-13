import { IUploadRequest } from '../types/RequestType';
import { BASE_API_URL, HttpMethod } from './request';

export const uploadRequest = (body: IUploadRequest) => {
    const formData = new FormData();
    formData.append('file', body.image, 'file.png');

    return {
        url: `${BASE_API_URL}/upload`,
        options: { method: HttpMethod.POST, body: formData },
    };
};
