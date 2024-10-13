import { Text, TextProps, View } from "react-native";
import React, { useState } from "react";
import { MotiView } from "moti";

interface TickerListProps {
  number: number;
  fontSize: number;
  index: number;
}

const numbersToNice = [...Array(10).keys()];
const _stagger = 50;

function Tick({
  children,
  fontSize,
  style,
  ...rest
}: TextProps & { fontSize: number }) {
  return (
    <Text
      {...rest}
      style={[
        style,
        {
          fontSize: fontSize,
          lineHeight: fontSize * 1.1,
          fontVariant: ["tabular-nums"],
          fontWeight: "900",
        },
      ]}
    >
      {children}
    </Text>
  );
}

const TickerList: React.FC<TickerListProps> = ({ number, fontSize, index }) => {
  return (
    <View style={{ height: fontSize, overflow: "hidden" }}>
      <MotiView
        animate={{
          translateY: -fontSize * 1.1 * number,
        }}
        transition={{ delay: index * _stagger, damping: 80, stiffness: 200 }}
      >
        {numbersToNice.map((num, index) => (
          <Tick key={`number-${num}-${index}`} fontSize={fontSize}>
            {num}
          </Tick>
        ))}
      </MotiView>
    </View>
  );
};

export default function Ticker({
  value = 12385,
  fontSize = 50,
}: {
  value: number;
  fontSize?: number;
}) {
  const initNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  const splittedVaule = initNumber.toString().split("");
  const [newFontSize, setNewFontSize] = useState(fontSize);
  return (
    <View>
      <Tick
        fontSize={fontSize}
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ position: "absolute", left: 100000, top: 100000 }}
        onTextLayout={(e) => {
          setNewFontSize(e.nativeEvent.lines[0].ascender);
        }}
      >
        {initNumber}
      </Tick>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {splittedVaule.map((number, index) => {
          if (!isNaN(parseInt(number))) {
            return (
              <TickerList
                key={index}
                index={index}
                fontSize={newFontSize}
                number={parseInt(number)}
              />
            );
          }
          return (
            <Tick fontSize={newFontSize} key={index} style={{ opacity: 0.3 }}>
              {number}
            </Tick>
          );
        })}
      </View>
    </View>
  );
}
