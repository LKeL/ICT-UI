/**
 * Test File is a file for testing documenation!
 *
 * @module entrypoint
 */


import * as React from "react";
import * as ReactDOM from "react-dom";

declare const $$webpack_dev: boolean;

type HMRModule = typeof module & {
    hot?: {
        accept(dependencies: string | string[],
            callback: (updatedDependencies: any[]) => void): void
        accept(moduleName: string, callback: () => void): void
    }
};

import * as m from "./m";

if ($$webpack_dev && (module as HMRModule).hot) {
    // dev w/ HMR: hot-reload './m', './greeting' and re-render

    console.info("configuring webpack HMR");
    console.info("m=", m);
    (module as HMRModule).hot.accept(["./m", "./components/demo"], function () {
        console.log("accept handler get called", [].slice.call(arguments));
        console.info("m=", m);
    });
} else if ($$webpack_dev) {
    // dev w/o HMR
    console.info("webpack HMR not available");
}

import {Greeting} from "./components/demo";
import {observer} from "mobx-react";
import {observable, computed} from "mobx";
class Todo {
  id = Math.random();
  @observable title:any;
  @observable finished = false;
  constructor(title:any) {
    this.title = title;
  }
}

class TodoList {
  @observable todos:any[] = [];
  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}

@observer 
class TodoListView extends React.Component<{todoList: any}> {
  render() {
    return (
      <div>
        <ul>
          {this.props.todoList.todos.map((todo:any) => (
            <TodoView todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
    );
  }
}

const TodoView = observer(({ todo }: {todo:any}) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => (todo.finished = !todo.finished)}
    />
    {todo.title}
  </li>
));

const store = new TodoList();


ReactDOM.render(
    <TodoListView todoList={store} />,
    document.getElementById("app")
);

import WxSdk from "@/assets/js/jweixin";


store.todos.push(new Todo('Get Coffee'), new Todo('Write simpler code'));
store.todos[0].finished = true;
console.log(WxSdk);
