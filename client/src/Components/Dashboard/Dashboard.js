import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { getAllque, getAllqueSub } from "../../config/Myservice";
import { useDispatch, useSelector } from "react-redux";

import { Container, Modal, Table, Row, Col } from "react-bootstrap";
import Papers from "../Paper/Papers";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lgShow, setLgShow] = useState(false);

  // const allque = useSelector((state) => state.allque);
  const [subject, setSubject] = useState("");
  const [allque, setAllque] = useState([]);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      navigate("/login");
    }
    // dispatch({ type: "GET_DATA_FUNC_CALL" });

    // setAllques(allque)
    // const user = JSON.parse(localStorage.getItem("user"));
    // const email = user.email;
    // let arrallque = allques;
    // let obj = {};
    // obj.arr = new Array();
    // obj.arr = arrallque;
    // obj.arr = obj.arr.filter(
    //   (value, index, self) =>
    //     index === self.findIndex((t) => t.subject === value.subject)
    // );
    // setSubjects(obj.arr);

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const email = user.email;
      getAllque(email).then((res) => {
        console.log(res.data.data);
        setAllque(res.data.data);
        let arrallque = res.data.data;
        // let uniqueArray = arr.filter(function (item, pos) {
        //   return arr.indexOf(item) == pos;
        // });
        // console.log(uniqueArray)
        // setSubjects(uniqueArray);
        let obj = {};
        obj.arr = new Array();
        obj.arr = arrallque;
        obj.arr = obj.arr.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.subject === value.subject)
        );
        setSubjects(obj.arr);
      });
    }
  }, []);
  const getsub = (subject) => {
    const updatedsub = allque.filter((curElem) => {
      return curElem.subject === subject;
    });
    return updatedsub.length;
  };

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col xl={7}>
            {" "}
            <Table
              hover
              variant="dark"
              className="tablesubject mt-3 mb-3 fontapply w-100"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subjects</th>
                  <th>Papers</th>
                </tr>
              </thead>
              <tbody className="">
                {subjects &&
                  subjects.map((sub, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{sub.subject}</td>
                      <td>{getsub(sub.subject)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>{" "}
          </Col>
          <Col >
            <button className="dashbutton" onClick={() => navigate("/qmaker")}>
              Add New Paper{" "}
            </button>
          </Col>
        </Row>

        <Table
          striped
          bordered
          hover
          className="tablesubject mt-4 tabletd w-100 tablefontapply"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {subjects &&
              subjects.map((sub, i) => (
                <tr>
                  <td>{i + 1}</td>
                  {/* <td onClick={() => navigate(`/${sub.subject}`)}> */}
                  <td>
                    <button
                      type="button"
                      className="btn btn-link"
                      data-toggle="modal"
                      data-target=".bd-example-modal-lg"
                      onClick={() => {
                        setLgShow(true);
                        setSubject(sub.subject);
                      }}
                    >
                      {" "}
                      {sub.subject}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              <h2 className="fontapply">All Papers</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Papers subject={subject} />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
