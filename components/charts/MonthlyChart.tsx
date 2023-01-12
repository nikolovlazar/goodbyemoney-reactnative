import React from 'react';
import { Svg, G, Rect, Text, Line } from 'react-native-svg';
import { Dimensions } from 'react-native';
import * as d3 from 'd3';

import { shortenNumber } from '../../utils/number';
import { theme } from '../../theme';
import { Expense } from '../../models/expense';

type Props = {
  expenses: Expense[];
  date: Date;
};

const GRAPH_MARGIN = 11;
const GRAPH_BAR_WIDTH = 8;

export const MonthlyChart = ({ expenses, date }: Props) => {
  const numOfDaysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  let averageExpense = 0;
  const defaultValues = Array.from({ length: numOfDaysInMonth }, (_, i) => ({
    day: i + 1,
    total: 0,
  }));

  const groupedExpenses = expenses.reduce((acc, expense) => {
    averageExpense += expense.amount;
    const day = expense.date.getDate();
    const existing = acc.find((e) => e.day === day);
    if (!!existing) {
      existing.total += expense.amount;
      return acc;
    }
    acc.push({
      day,
      total: expense.amount,
    });
    return acc;
  }, defaultValues);
  averageExpense = averageExpense / expenses.length;

  const SVGHeight = 147 + 2 * GRAPH_MARGIN;
  const SVGWidth = Dimensions.get('window').width;
  const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
  const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

  // x scale point
  const xDomain = groupedExpenses.map((expense) => expense.day);
  const xRange = [35, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(2);

  // y scale point
  const maxValue = d3.max(groupedExpenses, (e) => e.total);
  const yDomain = [0, maxValue];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  return (
    <Svg width={SVGWidth} height={SVGHeight}>
      <G y={graphHeight}>
        {groupedExpenses.map((item, index) => (
          <React.Fragment key={item.day}>
            <Rect
              x={x(item.day)}
              y={y(yDomain[1]) * -1}
              rx={4}
              width={GRAPH_BAR_WIDTH}
              height={y(yDomain[1])}
              fill={theme.colors.card}
            />
            <Rect
              x={x(item.day)}
              y={y(item.total) * -1}
              rx={4}
              width={GRAPH_BAR_WIDTH}
              height={y(item.total)}
              fill='white'
            />
            {index % 5 === 0 && (
              <Text
                x={x(item.day) - 3 + GRAPH_BAR_WIDTH / 2}
                y={20}
                fill={theme.colors.textSecondary}
                fontSize={14}
              >
                {item.day}
              </Text>
            )}
          </React.Fragment>
        ))}
        <Text
          x={40}
          y={0}
          fill={theme.colors.textSecondary}
          fontSize={16}
          textAnchor='end'
        >
          0
        </Text>
        <Text
          x={40}
          y={y(averageExpense) * -1}
          fill={theme.colors.textSecondary}
          fontSize={16}
          textAnchor='end'
        >
          {shortenNumber(averageExpense)}
        </Text>
        <Text
          x={40}
          y={y(yDomain[1]) * -1 + 12}
          fill={theme.colors.textSecondary}
          fontSize={16}
          textAnchor='end'
        >
          {shortenNumber(maxValue)}
        </Text>
        <Line
          x1={44}
          y1={y(averageExpense) * -1 - 4}
          x2={x(xDomain[xDomain.length - 1]) + GRAPH_BAR_WIDTH}
          y2={y(averageExpense) * -1 - 4}
          stroke={theme.colors.textSecondary}
          strokeDasharray={4}
        />
      </G>
    </Svg>
  );
};
