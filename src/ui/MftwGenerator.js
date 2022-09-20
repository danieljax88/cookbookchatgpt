import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/styles'
import Link from 'next/link';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,

    },
    fontWeight: "bold",
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const MftwGenerator = (props) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down("md"))
    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const weekdayRecipes = props.recipes.map((recipe, index) => ({ ...recipe, weekday: weekdays[index] }))

    console.log(weekdayRecipes)
    // const weekdayRecipes = props.recipes.forEach((recipe) => {
    //     recipe.push({ ...weekdays })
    // })
    // console.log(weekdayRecipes)
    const bigTable = (
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
                <StyledTableRow >
                    <TableCell width="14%" align="center" >Monday</TableCell>
                    <TableCell width="14%" align="center">Tuesday</TableCell>
                    <TableCell width="14%" align="center">Wednesday</TableCell>
                    <TableCell width="14%" align="center">Thursday</TableCell>
                    <TableCell width="14%" align="center">Friday</TableCell>
                    <TableCell width="14%" align="center">Saturday</TableCell>
                    <TableCell width="14%" align="center">Sunday</TableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {props.recipes.map((recipe) => (

                        <TableCell key={recipe.key} component="th" scope="recipes">
                            <Link href={`/recipes/${recipe.key}`} passHref>
                                <Card elevation={3} sx={{ maxWidth: 300 }}>
                                    <CardActionArea>
                                        <CardHeader
                                            titleTypographyProps={{ fontWeight: "Bold" }}
                                            title={recipe.title}
                                        />

                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={recipe.image ? recipe.image : "/assets/comingsoon.jpg"}
                                            alt="Food"
                                        />
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </TableCell>

                    ))}
                </TableRow>
            </TableBody>
        </Table>
    )
    const smallTable = (
        <div>
            <Container>
                < Grid container justify="center" alignItems="center" direction="row" marginTop="30px" >
                    <Grid container spacing={2}>
                        {weekdayRecipes.map((recipe) => (

                            <Link key={recipe.key} href={`/recipes/${recipe.key}`} passHref>

                                <Grid item xs={12} md={6}>
                                    <Typography sx={{
                                        fontSize: {
                                            lg: 100,
                                            md: 60,
                                            sm: 35,
                                            xs: 25
                                        },
                                        fontFamily: 'Pacifico',
                                        fontWeight: 'Bold'

                                    }}>{recipe.weekday}</Typography>
                                    <Card elevation={3} sx={{ maxWidth: 400 }}>
                                        <CardActionArea>
                                            <CardHeader
                                                titleTypographyProps={{ fontWeight: "Bold" }}
                                                title={recipe.title}
                                                subheader={recipe.description}
                                            />

                                            <CardMedia
                                                component="img"
                                                height="194"
                                                // image="/assets/comingsoon.jpg"
                                                image={recipe.image ? recipe.image : "/assets/comingsoon.jpg"}
                                                alt="Coming Soon"
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Link>
                        ))}
                    </Grid>
                </Grid >
            </Container>
        </div>
    )
    return (
        <TableContainer component={Paper}>
            {matches ? smallTable : bigTable}
        </TableContainer>
    )
}

export default MftwGenerator