import React, { useState, useEffect } from 'react';
import routesService from '../../services/routeService';

const AllRoutes = () => {
    const [routes, setRoutes] = useState([]);

    const getRoutes = async() => {
        try {
            const response = await routesService.getRoutes();
            console.log(response)
            setRoutes(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log('holi')
        getRoutes()
    }, [])

    return (
        <div>
            all routes view
            {routes.map((elem => <p>{elem.name}</p>))}
        </div>
    );
};

export default AllRoutes;