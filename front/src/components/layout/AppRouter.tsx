import { useRoutes } from 'react-router-dom';

import { HomePage } from '../../routes/HomePage';
import { UploadImagePage } from '../../routes/UploadImagePage';
import { PageNotFound } from '../../routes/PageNotFound';
import { AppLayout } from '../../layouts/AppLayout';

export function AppRouter() {
    const routes = useRoutes([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                { path: '/', element: <HomePage /> },
                { path: '/upload-image', element: <UploadImagePage /> },
            ],
        },
        {
            path: '*',
            element: <PageNotFound />,
        },
    ]);

    return routes;
}
