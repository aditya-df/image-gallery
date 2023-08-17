import dayjs from "dayjs";
import 'dayjs/locale/id'
export function convertTime(time) {
    return dayjs(time).locale('id').format("dddd, D MMMM YYYY HH:mm WIB");
}

export default {
    install(app) {
        app.config.globalProperties.$convertTime = convertTime;
    }
};