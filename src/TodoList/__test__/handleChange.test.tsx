import React from "react";
import TodoList from "../components/TodoList";
import { shallow } from "enzyme";


describe("<TodoList />", () => {
  test("should display a TodoList", async () => {
    const wrapper = shallow(<TodoList />);

    expect(wrapper.find('Todo')).toHaveLength(3);

    const todolistForm = wrapper.find({"data-testid": "newTodoInput"}).props().value;

    expect(todolistForm).toEqual("");
  });

  test("should allow entering a new todo", async () => {
    const wrapper = shallow(<TodoList />);

    wrapper.find({"data-testid": "newTodoInput"})
           .simulate('change', { target: { value: "newtodo" } });

    expect(wrapper.instance().state).toHaveProperty("newTodoInput", "newtodo");
  });
});


