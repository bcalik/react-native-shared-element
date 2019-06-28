// @flow
import * as React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Heading2 } from "./Text";
import { Router } from "./Router";
import { Colors } from "./Colors";
import { Icon } from "./Icon";

const HEIGHT = 86;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: HEIGHT,
    backgroundColor: Colors.navBar,
    paddingHorizontal: 32,
    paddingBottom: 16
    //...Shadows.elevation1
  },
  lightContainer: {
    backgroundColor: "transparent"
  },
  backContainer: {
    position: "absolute",
    left: 10,
    bottom: 10
  }
});

export interface NavBarProps {
  style?: any;
  title?: string;
  back: "default" | "none" | "close";
  light?: boolean;
}

const HIT_SLOP = {
  left: 16,
  top: 16,
  right: 16,
  bottom: 16
};

export class NavBar extends React.Component<NavBarProps> {
  static defaultProps = {
    back: "default"
  };

  static HEIGHT = HEIGHT;

  renderBack() {
    let icon;
    const { back } = this.props;
    switch (back) {
      case "none":
        return;
      case "default":
        icon = "chevron-left";
        break;
      case "close":
        icon = "cross";
        break;
      default:
        return;
    }
    return (
      <TouchableOpacity
        style={styles.backContainer}
        onPress={this.onPressBack}
        hitSlop={HIT_SLOP}
      >
        <Icon name={icon} size={28} color={Colors.text} />
      </TouchableOpacity>
    );
  }

  render() {
    const { style, title, light } = this.props;
    return (
      <View
        style={[
          styles.container,
          light ? styles.lightContainer : undefined,
          style
        ]}
      >
        <Heading2 light={light}>{title}</Heading2>
        {this.renderBack()}
      </View>
    );
  }

  onPressBack = () => {
    Router.pop();
  };
}
