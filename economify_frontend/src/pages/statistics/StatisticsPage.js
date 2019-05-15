import React from 'react';
import { getColor } from 'utils/colors';
import { Row, Col, Card, CardHeader, CardBody, Input } from 'reactstrap';
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

const paseStatisticsByCategoryData = (data, color, filter) => {
  const datasets = Object.keys(data.data)
    .filter(key => filter(data.data[key]))
    .map(key => {
      const value = data.data[key];

      return {
        label: value.name,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        data: data.statistics.map(obj => Math.abs(obj[key] || 0)),
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

class StatisticsPage extends React.Component {
  state = {
    loadingByCategory: true,
    dataExpensesByCategoryAndMonth: {},
    dataInconmingsByCategoryAndMonth: {},
    loadingSaves: true,
    dataSaves: {},
  };

  componentDidMount() {
    this.loadStatistics(new Date().getFullYear());
  }

  loadStatistics(year) {
    this.loadStatisticsByCategory(year);

    this.loadStatisticsSaves(year);
  }

  loadStatisticsByCategory(year) {
    this.setState({ loadingByCategory: true });

    getStatisticsByCategory(year)
      .then(data => {
        this.setState({
          dataExpensesByCategoryAndMonth: paseStatisticsByCategoryData(
            data,
            getColor('danger'),
            c => c.type === 'expense',
          ),
          dataIncomesByCategoryAndMonth: paseStatisticsByCategoryData(
            data,
            getColor('success'),
            c => c.type === 'income',
          ),
          loadingByCategory: false,
        });
      })
      .catch(err => {
        alert('Error loading statistics by category.');
        console.log(err);

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
          <Col md={{ size: 2, offset: 10 }}>
            <Input
              type="select"
              name="year"
              id="yearSelect"
              onChange={e => this.loadStatistics(e.target.value)}
            >
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
            </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>Expenses by category and month</CardHeader>
              <CardBody>
                {this.loadingByCategory ? (
                  <Loading />
                ) : (
                  <Bar
                    data={this.state.dataExpensesByCategoryAndMonth}
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
              <CardHeader>Incomes by category and month</CardHeader>
              <CardBody>
                {this.loadingByCategory ? (
                  <Loading />
                ) : (
                  <Bar
                    data={this.state.dataIncomesByCategoryAndMonth}
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
