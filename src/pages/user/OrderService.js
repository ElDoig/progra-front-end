import api from '../../components/services/api';

export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener orden:", error);
        return null;
    }
};

export const cancelOrder = async (orderId) => {
    try {
        
        const response = await api.patch(`/orders/${orderId}/cancel`); 
        return response.data;
    } catch (error) {
        console.error("Error al cancelar orden:", error);
        throw error; 
    }
};