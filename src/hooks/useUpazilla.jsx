import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";

const useUpazilla = (zillaId) => {
    const {
        data: upazillaData,
        error: upazillaError,
        isPending: upazillaLoading,
        refetch: upazillaRefetch,
    } = useQuery({
        queryKey: ["upazilla"],
        queryFn: async () => {
            const res = await axios.get(
                "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/upazilas/upazilas.json"
            );
            if (!zillaId)
                return res.data[2].data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            const filteredData = res.data[2].data.filter(
                (item) => item.district_id === zillaId
            );
            return filteredData.sort((a, b) => a.name.localeCompare(b.name));
        },
    });
    return { upazillaData, upazillaError, upazillaLoading, upazillaRefetch };
};

useUpazilla.propTypes = {
    zillaId: PropTypes.number,
};

export default useUpazilla;
