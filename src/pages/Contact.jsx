import React, { useRef,useState } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
// import * as mongodb from 'mongodb';
import {LinearProgress} from "@material-ui/core"
import emailjs from '@emailjs/browser';
import {Alert} from '@material-ui/lab';
import "../styles/create-item.css";

const Contact = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const messageRef = useRef("");
  const form=useRef();
  const [loading, setloading] = useState(false)
  const [progress, setprogress] = useState(20)
  const [Msg, setMsg] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setloading(true)
    // const  {MongoClient } =require("mongodb")
    // const mongodb = new MongoClient("mongodb://localhost:27017")
    // const Contectform=mongodb.db("Nft_marketplace").collection("Contectform")
    const name=nameRef.current.value;
    const email=emailRef.current.value;
    const subject=subjectRef.current.value;
    const message=messageRef.current.value;
    setprogress(50)
    emailjs.sendForm('service_19lesgm', 'template_j1cc0qs', form.current, 'KXPwsDDpgj4Xv1W-m')
      .then((result) => {
          console.log(result.text);
          setprogress(100)
          setMsg("done")
          setMsg()
          setloading(false)
          
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <> 
      <CommonSection title="Contact" />
      <section className="section">
        <Container>
       
          <Row>
          
            <Col lg="6" md="6" className="m-auto text-center">
             <div>
                  {
                    loading?(<Alert severity="success">Your Message successfully Send</Alert>):(console.log("Not yet"))
                  }
                  {
                    loading?(<LinearProgress variant="buffer" value={progress} valueBuffer={30} />):(console.log("Not yet"))
                  }
             </div>
              <h2>Drop a Message</h2>
             
              <div className="contact mt-4">
                <form  ref={form}onSubmit={handleSubmit}>
                  <div className="form__input">
                    <input
                      required
                      type="text"
                      name="from_name"
                      placeholder="Enter your name"
                      ref={nameRef}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      required
                      type="email"
                      name="Email_id"
                      placeholder="Enter your email"
                      ref={emailRef}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      required
                      type="text"
                      name="Subject"
                      placeholder="Enter subject"
                      ref={subjectRef}
                    />
                  </div>
                  <div className="form__input">
                    <textarea
                      required
                      rows="7"
                      name="message"
                      placeholder="Write message"
                      ref={messageRef}
                    ></textarea>
                  </div>

                  <button
                    className="send__btn"
                    type="submit"
                    style={{
                      border: "none",
                      padding: "7px 25px",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}
                  >
                    Send a Message
                  </button>
                  
                  
                  
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;
