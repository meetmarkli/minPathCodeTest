import React from "react";
import { mount } from "enzyme";
import App from "../../../src/App.js";

describe("Generate Matrix", () => {
  test("Generate Matrix Button Content", () => {
    const wrapper = mount(<App />);
    const button = wrapper.find("button");
    expect(button.text()).toBe("Generate Matrix");
  });
  test("it contains one button", () => {
    const wrapper = mount(<App />);
    const button = wrapper.find("button");
    expect(button.length).toBe(1);
  });
});
