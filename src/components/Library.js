import React, { Fragment, useEffect, useState } from 'react'
import { Table, FormControl,Button, Row, Col } from 'react-bootstrap'
import * as api from '../api/index'

const Library = () => {
    const [ contents, setContents ] = useState(null);
    
    //calling list
    useEffect(() => {
        api.getLibraryContents()
            .then((res) => {
                if (res) {
                    setContents(res.data);
                    console.log(res.data)
                }
            })  
    }, [])


    const downloadCSV = () => {
        api.downloadCSV("/download").then((res) => {
            var downloadElement = document.createElement("a");
            downloadElement.href = "data:text/csv;charset=utf-8," + encodeURIComponent(res.data);
            downloadElement.target = "_blank";

            downloadElement.download = "librarylist.csv";
            downloadElement.click();
        })
    }
    

    const handleSearch = (value, source) => {
        if (value && source === "isbn") {
            const contentsCopy = [...contents]
            let filteredContent = contentsCopy.filter(item => item.bookIsbn === value);
            setContents(filteredContent);

        } else if (value && source === "email") {
            const contentsCopy = [...contents]
            let filteredContent = contentsCopy.filter(item => item.email === value);
            setContents(filteredContent);
        }
    }

  return (
    <Fragment>
        <div>
        <h3>Library Contents</h3> 

        <Row className="mb-3 mt-2">
                <Col>
                    <FormControl 
                        placeholder='Search by ISBN' 
                        onChange={(e) => handleSearch(e.target.value, "isbn")}
                    />
                </Col>
                <Col>
                    <FormControl 
                        placeholder='Search by Email'
                        onChange={(e) => handleSearch(e.target.value, "email")}
                    />
                </Col>  
                <Col>
                    <Button
                        onClick={downloadCSV}
                    >
                            Download CSV
                    </Button>
                </Col>
        </Row>
           
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Author Name</th>
                    <th>email</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Description</th>
                </tr>
            </thead>

            <tbody>
                {
                    contents && contents.map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.title}</td>
                                <td>{item.bookIsbn}</td>
                                <td>{item.bookDesc }</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            
        </Table> 
        </div>
        
    </Fragment>
    
  )
}

export default Library