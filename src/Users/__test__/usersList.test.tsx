import React from "react";
import { mount } from "enzyme";
import UsersList from "../components/UsersList";
import api from '../../api/users';

jest.mock("../../api/users");

describe("<UsersList />", () => {
  test("should display the list of Users", async () => {
    const wrapper = mount(<UsersList />);

    expect(api.getUsers).toHaveBeenCalledTimes(1);
    await Promise.resolve();
    expect(wrapper.update().find('UsersListItem')).toHaveLength(2);
  });
});


