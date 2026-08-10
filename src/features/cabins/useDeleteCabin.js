import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDelteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } =
    useMutation({
      mutationFn: deleteCabinApi,
      onSuccess: () => {
        toast.success("Cabins successfully deleted");

        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isDeleting, deleteCabin };
}
