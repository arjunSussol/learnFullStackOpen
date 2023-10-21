import PropTypes from 'prop-types';
import { StatisticLine } from './StatisticLine';

type statisticsType = {
    statistics: {
        all: number;
        average: number;
        positive: number;
    }
}

export const Statistics = ({statistics}: statisticsType) => {
    const statsDetails = [
        {key: "all", value: statistics.all},
        {key: "average", value: statistics.average},
        {key: "positive", value: statistics.positive}
    ];

    return(
        <div>
            {statsDetails.map(({key, value}) => <StatisticLine key={key} text={key} value={value}/> )}
        </div>
    )
}

Statistics.propTypes = {
    statistics: PropTypes.object,
}