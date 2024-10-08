import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, FormGroup, Label, Input, Button , Row , Col, Alert } from "reactstrap";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";


const IMCCalculator = () => {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState("male");
  const [activityFactor, setActivityFactor] = useState(1.2);
  const [imc, setImc] = useState();

  const calculateImc = () => {
    const heightMeters = height / 100;
    const imcValue = weight / (heightMeters * heightMeters);
    setImc(imcValue.toFixed(2));
  };

  const handleHeightChange = (event) => {
    setHeight(Number(event.target.value));
  };

  const handleWeightChange = (event) => {
    setWeight(Number(event.target.value));
  };

  const handleAgeChange = (event) => {
    setAge(Number(event.target.value));
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleActivityFactorChange = (event) => {
    setActivityFactor(Number(event.target.value));
  };

  return (
    <Container>
      {/* informations :  */}


    <Form>
  <h2 className="text-center mb-4"style={{ color: "white", fontSize: "6rem" }}>BMI Calculator</h2>
  <Row form>
    <Col md={6}>
      <FormGroup>
        <Label for="height" style={{ color: "white", fontSize: "2rem" }}>
          Height (cm):
        </Label>
        <Input style={{ fontSize: "2rem" }}
          type="number" name="height" id="height" value={height} onChange={handleHeightChange}  />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="weight" style={{ color: "white", fontSize: "2rem" }}>
          Weight (kg):
        </Label>
        <Input style={{ fontSize: "2rem" }}
          type="number"
          name="weight"
          id="weight"
          value={weight}
          onChange={handleWeightChange}
        />
      </FormGroup>
    </Col>
  </Row>

<Row>
    <Col>
    <FormGroup>
    <Label for="age" style={{ color: "white", fontSize: "2rem" }}>
      Age:
    </Label>
    <Input style={{ fontSize: "2rem" }}
      type="number"
      name="age"
      id="age"
      value={age}
      onChange={handleAgeChange}
    />
  </FormGroup>
  </Col>



<Col>
  <FormGroup>
    <Label for="gender" style={{ color: "white", fontSize: "2rem" }}>
      Gender:
    </Label>
    <Input style={{ fontSize: "2rem" }}
      type="select"
      name="gender"
      id="gender"
      value={gender}
      onChange={handleGenderChange}
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
    </Input>
  </FormGroup>

    
    </Col>
</Row>
 
 
  <FormGroup>
    <Label
      for="activityFactor"
      style={{ color: "white", fontSize: "2rem" }}
    >
      Activity Factor:
    </Label>
    <Input style={{ fontSize: "2rem" }}
      type="select"
      name="activityFactor"
      id="activityFactor"
      value={activityFactor}
      onChange={handleActivityFactorChange}
    >
      <option value="1.2">Sedentary</option>
      <option value="1.375">Lightly Active</option>
      <option value="1.55">Moderately Active</option>
      <option value="1.725">Very Active</option>
      <option value="1.9">Extra Active</option>
    </Input>
  </FormGroup>
  <Button   color="danger"
  size="lg"
  className="rounded-pill shadow-sm"
 onClick={calculateImc}>
    Calculate IMC
  </Button>
  <br />
  <FormGroup>
    <Label for="imc" style={{ color: "white", fontSize: "2rem" }}>
      IMC:
    </Label>
    <Alert style={{ fontSize: "2rem" }} variant="danger" disabled>
  Your IMC is : {imc} 
</Alert>
  </FormGroup>
</Form>


<Card className="mb-3">
  <CardBody>
    <CardTitle style={{ color: "black", fontSize: "2rem", marginBottom: "2rem" }}>
      BMI Information
    </CardTitle>
    <CardText style={{ color: "black", fontSize: "1.75rem" }}>
      The body mass index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. Use this BMI calculator to calculate your BMI and determine your weight status.
    </CardText>
    <ul style={{ color: "red", fontSize: "1.5rem", marginTop: "2rem" }}>
      <li>
        <span style={{ color: "red" }}>A BMI of less than 18.5 means you are underweight</span>
      </li>
      <li>
        <span>A BMI of 18.5–24.9 means you are at a healthy weight</span>
      </li>
      <li>
        <span style={{ color: "red" }}>A BMI of 25–29.9 means you are overweight</span>
      </li>
      <li>
        <span style={{ color: "red" }}>A BMI of 30 or more means you are obese</span>
      </li>
    </ul>
  </CardBody>
</Card>


    </Container>
  );
};

export default IMCCalculator;
