import HeaderFront from "../shared/HeaderFront";
import FooterFront from "../shared/FooterFront";
import { FormText, Form, FormGroup, Label, Input, Button , Row , Col, Alert } from "reactstrap";
import { Card, CardBody, CardTitle, CardText,Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState ,useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';

import "./gyms.css" ;
import HeaderSignedInClient from "../shared/HeaderSignedInClient";


const GymsManagement=()=>{
  const [gyms, setGyms] = useState([]);
  const [Offers, setOffers] = useState([]);
  const [postuling, setPostuling] = useState(false);
  const [postuleId, setPostuleId] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteGym,setDeletedGymId ]= useState(null);
    const[ performance,setPrfomance]= useState(null);


    const [formValues, setFormValues] = useState({
      name: '',
      description: '',
      localisation: '',
      photo: '',
      services: '',
    });
    const [formOffer, setFormOffer] = useState({
      name: '',
      type: '',
      Price:''
    });
   
    const [showOffer, setShowOffer] = useState(false);

    const idu = localStorage.getItem('userId') ;

    const handleEdit = async (id) => {
      try {
        const response = await axios.get(`https://fitmind-backend.onrender.com/api/gyms/${id}`);
        console.log(id)
        console.log(response.data)
        setFormValues(response.data);
        setEditing(true);
        setEditId(id);



      } catch (error) {
        console.error(error);
      }
    };

    const HandleDeleteGym = async (id) => {
     
      try {
       await axios.delete(`https://fitmind-backend.onrender.com/api/gyms/${id}`);
       setDeletedGymId(id);
  
      } catch (error) {
        console.error(error);
      }
    };

    const handleVisible = async () => {
  setShowForm(!showForm) ;
    }


    useEffect(() => {
      getGyms();
    }, [deleteGym,performance]
    );

    const getGyms = async () => {
     
      try {
        const response = await axios.get(`https://fitmind-backend.onrender.com/api/gyms/getGymsByManager/${idu}`);
        setGyms(response.data);
      } catch (error) {
        console.error(error);
      }
    };


    const GetPerformance = async (id) => {
     
      try {
          await axios.get(`https://fitmind-backend.onrender.com/api/gyms/gym-performance/${id}`);
        setPrfomance(performance+1);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  


    const AddGyms =async (e)=>{
      e.preventDefault();
      try{
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('description', formValues.description);
      formData.append('services', formValues.services);
      formData.append('localisation', formValues.localisation);
      for (let i = 0; i < formValues.photo.length; i++) {
        formData.append('photo', formValues.photo[i]);
      }
      console.log(formValues.name);
      console.log(formValues.description);
      console.log(formValues.services);
      console.log(formValues.localisation);
      console.log(formValues.photo);
      console.log(editing);


      if (editing) {
         const  response = await axios.put(`https://fitmind-backend.onrender.com/api/gyms/update/${editId}`, formData);
        setEditing(false);
        console.log(response);
        console.log(formValues.name);
        console.log(formValues.description);
        console.log(formValues.services);
        console.log(formValues.localisation);
        console.log(formValues.photo);
      
        console.log(editing);
        
        
      } else {
         await axios.post(`https://fitmind-backend.onrender.com/api/gyms/add/${idu}`, formData);
      }
console.log(e) ;
console.log(editing);
      setFormValues({
        name: '',
        description: '',
        price: '',
        photo: '',
        quantity: '',
      });
      getGyms() ;
    }
    catch (error) {
      console.error(error);
    }
  }



  

  const handleAddOffer = async (e) => {
    e.preventDefault();
    try {
      
      const url = `https://fitmind-backend.onrender.com/api/gyms/${postuleId}/offers`;
      const {data:res} = await axios.post(url, formOffer);
      console.log(res)
      setShowOffer(false);
      
    } catch (error) {
      console.error(error);
      // handle error
    }
  };
  
  const handleOffer = async (id) => {
    setShowOffer(true);
   setPostuleId(id);
  };
  


 



  
    
    return (
        <div style={{backgroundColor : "black"}}>
    <HeaderSignedInClient/>
    <main style={{ background: 'black' }}>
      {/*? Hero Start */}
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Gyms Management</h2>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    {/* <Button className='me-1 float-right' color='success' size='lg' onClick={()=> handleVisible()}>
      Add Your Gym
      </Button>  */}
        
     {  (
    <Container>
      {/* informations :  */}

      {showOffer && (
        <Form onSubmit={handleAddOffer}>
        <h2 className="text-center mb-4"style={{ color: "white", fontSize: "6rem" }}>Offer</h2>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name" style={{ color: "white", fontSize: "2rem" }}>
                Offer Name:
              </Label>
              <Input style={{ fontSize: "2rem" }}
                type="string" name="name" id="name" value={formOffer.name}
                onChange={(e) =>
                  setFormOffer({ ...formOffer, name: e.target.value })
                }  />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="type" style={{ color: "white", fontSize: "2rem" }}>
                Offer Type
              </Label>
              <Input style={{ fontSize: "2rem" }}
                type="string"
                name="type"
                id="type"
                value={formOffer.type}
                onChange={(e) =>
                  setFormOffer({ ...formOffer, type: e.target.value })
                }
              />
            </FormGroup>
          </Col>
        </Row>
      
      <Row>
          <Col>
          <FormGroup>
          <Label for="price" style={{ color: "white", fontSize: "2rem" }}>
            Price
          </Label>
          <Input style={{ fontSize: "2rem" }}
            type="number"
            name="price"
            id="price"
            value={formOffer.price}
            onChange={(e) =>
              setFormOffer({ ...formOffer, price: e.target.value })
            }
      
          />
        </FormGroup>
        </Col>
      
      
      
     
      </Row>
       
      
      
    
      <Button color="danger"
        size="lg"
        className="rounded-pill shadow-sm" type="submit" > Add  Offer</Button>
  
        
      </Form>

      )}


    <Form onSubmit={AddGyms}>
  <h2 className="text-center mb-4"style={{ color: "white", fontSize: "6rem" }}>Gyms</h2>
  <Row form>
    <Col md={6}>
      <FormGroup>
        <Label for="height" style={{ color: "white", fontSize: "2rem" }}>
          Gym Name:
        </Label>
        <Input style={{ fontSize: "2rem" }}
          type="string" name="height" id="name" value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }  />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="weight" style={{ color: "white", fontSize: "2rem" }}>
          Localisation :
        </Label>
        <Input style={{ fontSize: "2rem" }}
          type="string"
          name="weight"
          id="localisation"
          value={formValues.localisation}
          onChange={(e) =>
            setFormValues({ ...formValues, localisation: e.target.value })
          }
        />
      </FormGroup>
    </Col>
  </Row>

<Row>
    <Col>
    <FormGroup>
    <Label for="age" style={{ color: "white", fontSize: "2rem" }}>
      Services:
    </Label>
    <Input style={{ fontSize: "2rem" }}
      type="text"
      name="age"
      id="services"
      value={formValues.services}
      onChange={(e) =>
        setFormValues({ ...formValues, services: e.target.value })
      }

    />
  </FormGroup>
  </Col>



<Col>

  <FormGroup>
    <Label
      for="activityFactor"
      style={{ color: "white", fontSize: "2rem" }}
    >
      Description:
    </Label>
    <Input style={{ fontSize: "2rem" }}
      type="text"
      name="activityFactor"
      id="description"
      value={formValues.description}
      onChange={(e) =>
        setFormValues({ ...formValues, description: e.target.value })
      }
    >
    </Input>
  </FormGroup>
  
    </Col>
</Row>
 
<FormGroup  style={{ margin: "0 auto", width: "20%" }}>
    <Label for="file-input" style={{ color: "white", fontSize: "2rem" }}>
    <FaCloudUploadAlt className="file-icon" />
Gym Picture
    </Label>
    <Input style={{ fontSize: "2rem" }}
      type="file"
      name="height" 
      id="file-input"
      multiple
      onChange={(e) => {
        setFormValues({ ...formValues, photo: e.target.files });
      }}
    >
    </Input>
  </FormGroup>

  <div  style={{ margin: "0 auto", width: "17%" }}><Button type="submit"  color="danger"
  size="lg"
  className="rounded-pill shadow-sm"
>
{editing ? 'Update' : 'Add'} </Button>
{editing && (
<Button color="danger"
  size="lg"
  className="rounded-pill shadow-sm" onClick={() => setEditing(false)} > Cancel</Button>) }

</div>
  <br />
  
</Form>

    </Container>)}


   { <div className="main_content">

    {gyms.map((gym) =>
        <div className="card1
      " key={gym.id}>
            <div className="card1_img">
            <img
        src={`https://fitmind-backend.onrender.com/uploads/${gym.photo[0]}`}
//   alt={`Image of ${product.name}`}
              width="400"
            />
            </div>
            <div className="card1_header">
                <h2 style={{color: "red"}}>{gym.name}</h2>
                <p>{gym.description}</p>
                <p >Services :{gym.services}</p>
                <p >{gym.localisation}</p>
                <p className="price">participant : {gym.participant}</p>
                <p className="price">Days : {gym.days}</p>
                <p className="price">Performance : {gym.performance}</p>

                <div className="btn1" onClick={() => handleEdit(gym._id)} >Update</div>
                <div className="btn1" onClick={() => handleOffer(gym._id)}>Add Offer</div>
                <div className="btn1" onClick={() => HandleDeleteGym(gym._id)}>Delete</div>
                <div className="btn1" onClick={() => GetPerformance(gym._id)}>Get performance</div>



            </div>
        </div>
       
        
        )}

      </div>}






    
  <FooterFront/>
        </div>
      )
}

export default GymsManagement  
