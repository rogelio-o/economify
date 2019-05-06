import React from 'react';
import { getColor } from 'utils/colors';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Line, Bar } from 'react-chartjs-2';
import Page from 'components/Page';
import Loading from 'components/Loading';
import {
  getStatisticsByCategory,
  getStatisticsSaves,
} from 'services/statisticsService';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'Dicember',
];

const paseStatisticsByCategoryData = data => {
  const datasets = Object.keys(data.data).map(key => {
    const value = data.data[key];
    const color =
      value.type === 'expense' ? getColor('danger') : getColor('success');

    return {
      label: value.name,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      data: data.statistics.map(obj => Math.abs(obj[key])),
    };
  });

  return {
    labels: MONTHS,
    datasets,
  };
};

const paseStatisticsSaves = data => {
  const color = getColor('primary');

  return {
    labels: MONTHS,
    datasets: [
      {
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        data: data.statistics,
        fill: false,
      },
    ],
  };
};

//<Line data={genLineData({ fill: false }, { fill: false })} />
class StatisticsPage extends React.Component {
  state = {
    loadingByCategory: true,
    dataByCategory: {},
    loadingSaves: true,
    dataSaves: {},
  };

  componentDidMount() {
    this.loadStatisticsByCategory(2019);

    this.loadStatisticsSaves(2019);
  }

  loadStatisticsByCategory(year) {
    this.setState({ loadingByCategory: true });

    getStatisticsByCategory(year)
      .then(data => {
        this.setState({ dataByCategory: paseStatisticsByCategoryData(data) });

        this.setState({ loadingByCategory: false });
      })
      .catch(err => {
        alert('Error loading statistics by category.');

        this.setState({ loadingByCategory: false });
      });
  }

  loadStatisticsSaves(year) {
    this.setState({ loadingSaves: true });

    getStatisticsSaves(year)
      .then(data => {
        this.setState({ dataSaves: paseStatisticsSaves(data) });

        this.setState({ loadingSaves: false });
      })
      .catch(() => {
        alert('Error loading statistics saves.');

        this.setState({ loadingSaves: false });
      });
  }

  render() {
    return (
      <Page title="Charts" breadcrumbs={[{ name: 'Charts', active: true }]}>
        <Row>
          <Col>
            <Card>
              <CardHeader>By Category</CardHeader>
              <CardBody>
                {this.loadingByCategory ? (
                  <Loading />
                ) : (
                  <Bar
                    data={this.state.dataByCategory}
                    options={{
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                      },
                    }}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>Saves</CardHeader>
              <CardBody>
                {this.loadingSaves ? (
                  <Loading />
                ) : (
                  <Line
                    data={this.state.dataSaves}
                    options={{
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                      },
                      legend: {
                        display: false,
                      },
                    }}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default StatisticsPage;
