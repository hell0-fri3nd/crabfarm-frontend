import type { ActivityLogs } from "~/types/activity-logs";
import api from "./api";

export const getActivityLogs = async (activityType?: string, id?: number): Promise<ActivityLogs[]> => {
    try {
        let url = `logs/`;
        if (activityType !== undefined) url += `/${activityType}/`;
        if (id !== undefined) url += `/${id}/`;

        const response = await api.get(url);
        return response.data.data;
    } catch (err: any) {
        throw err.response?.data.detail;
    }
};