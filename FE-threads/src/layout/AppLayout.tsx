import { Box, Grid, GridItem,} from "@chakra-ui/react";
import NavbarComponent from "@/components/Navbar/Navbar";
import ProfileComponent from "@/components/ProfilePage/Profile";
import SuggestedComponent from "@/components/Suggested/Suggested";
import { Outlet } from "react-router-dom";
import FooterComponent from "@/components/Footer/Footer";

function Home() {
    return (
        <Grid gridTemplateColumns="270px 1.5fr 1.1fr" bg="blackAlpha.800" h="100vh" >
            
            <GridItem px={6} py={4} borderRight="1px solid gray">
                <NavbarComponent />
            </GridItem>

            <GridItem overflow="auto" px={6} py={4} borderRight="1px solid gray">
                <Outlet />
            </GridItem>

            <GridItem  px={6} py={4} >
                <ProfileComponent />
                <Box mt={4}>
                    <SuggestedComponent />
                </Box>
                <Box mt={4}>
                    <FooterComponent />
                </Box>
            </GridItem>
        </Grid>
    );
}

export default Home;

 // // const navigate = useNavigate();
    // const [detail, setDetail] = useState(false);
    // const [data, setData] = useState([]);
    // const [form, setForm] = useState<formInputData>({
    //     content: "",
    //     image: "",
    //     user: "",
    // });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await API.get("/threads");
    //         setData(response.data.data);
    //     };
    //     fetchData();
    // }, []);
    // // console.log(data)

    // function handleChange(e: ChangeEvent<HTMLInputElement>) {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value,
    //     });
    // }

    // async function handlePost() {
    //     console.log(form);
    //     await API.post("/thread", form);
    // }

