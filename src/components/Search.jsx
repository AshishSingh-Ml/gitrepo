import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import {FiArrowLeft} from "react-icons/fi"
import {BsBookHalf} from "react-icons/bs"
import {BsCodeSquare} from "react-icons/bs"
import {MdPublic} from "react-icons/md"



const Container = styled.div`
width: 90vw;
`;
const Wrapper = styled.div`
height: 30vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;
const SearchContainer = styled.div`
width: 65%;
display: flex;
flex-direction: column;
position: relative;
@media (max-width: 600px) {
  width: 90%
}
`;
const SearchTopContainer = styled.div`
display: flex;
width: 100%;
`;
const SearchInput = styled.input`
display: flex;
width: 100%;
background: lightgray;

padding: 1.5rem;
&::placeholder{
    font-size: 20px;
}
&:focus{
    font-size: 20px;
}
`;

const SearchBottomContainer = styled.div`
width: 100%;
min-height: 50px;
max-height: 350px;
overflow-y: scroll;
z-index: 1000;
background-color: white;
color: black;
border: 1px solid #878787;
position: absolute;
top: 100%;
`;
const SearchData = styled.div`
margin: 1rem;
display: flex;
gap:1rem;
padding-right: 30px;
`;
const Img = styled.img`
object-fit: cover;
width: 50px;
height: 50px;
border-radius: 50%;
`;
const Para = styled.p`
cursor:pointer;
`;
const Card = styled.div`
width: 300px;
min-height: 450px;
border: 1px solid black;
background-color: white;
margin-left:35%;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
padding: 10px;
border-radius: 10%;
@media (max-width: 600px) {
    margin-left: 5%;
  }
`;

const CardBody = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const Image = styled.img`
object-fit: cover;
width: 200px;
height: 200px;
border-radius: 10%;
padding-bottom: 10px;
`;
const CardHeader = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
`
const Head = styled.h3`
padding-bottom: 10px;
`;
const Para1 = styled.p`
padding-bottom: 5px;

`;
const Para2 = styled.p`
padding-bottom: 5px;

`;
const Para3 = styled.p`
padding-bottom: 10px;

`;
const Button = styled.button`
padding: 10px;
background: #0CC2E7;
color: white;
border-radius: 5px;
border: none;
cursor: pointer;
`
const BottomMainContainer = styled.div`
width: 90vw;
background: white;
margin: 0 2vw;
`
const BottomContainer = styled.div`
display: flex; 
flex-direction: column;
margin: 0 2vw;
padding: 10px 0;
`
const Left = styled.div`
flex:1;


`
const Image1 = styled.img`
width: 200px;
height: 200px;
border-radius: 50%;

`
const Right = styled.div`
flex: 1;

`
const Head1 = styled.h4`
padding-bottom: 5px;
font-size: 24px;
font-weight: 500;
@media (max-width: 600px) {
  font-size: 16px;
}
`

const Parag = styled.p`
padding-bottom: 10px;

`
const Button1 = styled.button`
padding:0 5px;
height: 30px;
margin-bottom: 10px;
border-radius: 10%;
border: none;

`
const RightBottom = styled.div`
display: flex;
justify-content: space-between;
height: 100%;
width: 96%;
background: lightgray;
margin-top: 1px;
margin-right: 3%;
padding: 5px;
border: 1px solid black;

`
const RightOne = styled.div`
padding: 10px;
`
const RightTwo = styled.div`
padding: 10px;
`
const Button2= styled.button`
padding: 10px;
height: 40px;
background: #2874F0;
color: white;
padding-bottom: 20px;
margin: 2vw;
cursor: pointer;

`
const Search = () => {
    const [userSearchdata, setUserSearchData] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [display, setDisplay] = useState("none");
    const [userData, setUserData] = useState(null);
    const [userRepo, setUserRepo] = useState([]);
    const [repoData, setRepoData] = useState([]);
    const searchData = useRef(null);
    const handleChange = async (e) => {
        e.preventDefault();
        setSearchUser(e.target.value);
        // console.log(e.target.value);
        try{

            if(e.target.value!==""){
                await axios.get(`https://api.github.com/search/users?q=${e.target.value}`).then((response) => {
                    setUserSearchData([...response.data.items]);
                    
                    // console.log(response.data);
                });
            }
        }catch(err){
            console.log(err);
        }   
      }
    const handleClick = () => {
        setDisplay("block");
      }
          const closeSearch = (e) => {
        if (searchData.current && display && !searchData.current.contains(e.target)) {
          setDisplay('none')
    
        }
      }
      document.addEventListener('mousedown', closeSearch);

    const handleUser = async(index) =>{
        const a = userSearchdata[index];
        // console.log(a)
        setUserData({ ...a });
        setDisplay("none");
        await axios.get(`${a.url}`).then((response)=>{
          setUserRepo([response.data]);
        //   console.log(response.data);
        })
    } 
    const handleRepo = async(url) =>{
        await axios.get(`${url}`).then((response)=>{
            setRepoData([...response.data]);
            console.log(repoData);
          })
    }

    const handleBack = () =>{
      setRepoData([]);
    }
return (
    <>
    { (repoData.length===0) ? <Container>
        <Wrapper>
            <SearchContainer>
                <SearchTopContainer>
                <SearchInput type="search" value={searchUser} ref={searchData} onClick={handleClick} name="search" placeholder="Search a Github Profile here" onChange={(e) => { handleChange(e) }}  />
             
                </SearchTopContainer>
                <SearchBottomContainer  ref={searchData} style={{ display: `${display}` }}>
                    { userSearchdata.map((item, index)=>(
                        <SearchData>
                    <Img src={item.avatar_url} />
                    <Para onClick={() =>handleUser(index)}>{item.login} </Para>
                  </SearchData>
                ))
            }
                </SearchBottomContainer>

            </SearchContainer>
        </Wrapper>
        { userRepo.map((item)=>(
            <Card>
            <CardBody>
                <Image src={item.avatar_url}/>
                <Head>{item.login}</Head>
                <CardHeader>
                <Para1><b>Name:</b> {item.name}</Para1>
                <Para2><b>Bio:</b> {item.bio}</Para2>
                <Para3><b>Repositories:</b> {item.public_repos}</Para3>
                <Para3><b>Location:</b>{item.location}</Para3>
                <Para3><b>CreatedAt:</b>{item.created_at}</Para3>
                <Para3><b>UpdatedAt:</b>{item.updated_at}</Para3>

                <Button onClick={() =>handleRepo(item.repos_url)}>Show Repositories</Button>
                </CardHeader>
            </CardBody>
        </Card>
     ))
    }  
    </Container>  :  
           <BottomMainContainer>
               <Button2 onClick={()=>handleBack()}> <FiArrowLeft/>  Back To Search</Button2>
             { repoData.map((item,index)=>(
                 <BottomContainer>
            {index===0 && <Left>
                <Image1 src={item.owner?.avatar_url}/>
                <Head1><b>Name:</b> {item.owner?.login} 
                <br/><br /> <b>All Repositories</b>
                </Head1>
            </Left> }
            <Right>
                <RightBottom>
                  <RightOne>
                  <Head1><a style={{textDecoration: "none", color: "black"}} href={item.html_url}> <BsBookHalf/> {item.name}</a></Head1>
                  <Parag>{item.description}</Parag>
                  <Button1> <MdPublic/> {item.visibility}</Button1>
                  <Parag><b>Updated_At</b> {item?.updated_at}</Parag>
                  </RightOne>
                  <RightTwo>
                    <Button1> <BsCodeSquare/> {item?.language}</Button1>
                  </RightTwo>
                </RightBottom>
            </Right>
             </BottomContainer>
))
}
</BottomMainContainer>
}
     </>
     
  )
}

export default Search