import React from 'react'
import IndexNavbar from 'Components/Navbars/IndexNavbar';
import DarkFooter from 'Components/Footers/DarkFooter';
import { CardBody, Card, Container, Button } from 'reactstrap';

const SendJobs = () => {
  return (
    <div>
      <IndexNavbar isfixed={true} />
          <Container style={{"marginTop":"80px"}}>
      <Card>
        <CardBody>
        <div className={StyleSheet.title}>
          <h4 className="title title-up">Send Job Opportunity</h4>
        </div>
        <p>
            Congratulations, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium lacinia feugiat. Aliquam sollicitudin consectetur mi, a ornare neque tempor ac. Aliquam velit turpis, malesuada a mauris ac, consectetur euismod arcu. Quisque lacinia eros libero, eget sagittis magna feugiat in. Vestibulum ac tempor risus, non aliquet ipsum.
        </p>
        <div>
          <Button className="btn btn-info image-btn" type="button">
            Submit
          </Button>

        </div>
        </CardBody>
      </Card>
          </Container>
          <DarkFooter/>
    </div>
  )
}

export default SendJobs



