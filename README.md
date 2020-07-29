This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 重要

1. 使用 `yarn commit` 来进行 `commit` 操作
2. 添加了 `husky` `lint-staged`
3. `react` `eslint` 版本过低，导致有一些规则不能生效，目前存在以下规则

    ```js
        "@typescript-eslint/no-loss-of-precision": 0,
        "default-case-last": 0,
        "no-promise-executor-return": 0,
        "no-unreachable-loop": 0,
        "no-useless-backreference": 0
    ```
    
4. `husky` 降版本了，高版本不能生效，会报错
    > `We have nothing pre-commit hooks to run. Either you're missing the scripts`
5. `lint-staged` 也降版本了，兼容 `husky`

## 计划
1. 使用redux实现 -- 已完成

![redux](/readme/redux.png)

2. 实现router -- 已完成

![router](/readme/router.png)

3. 二级路由

![route](/readme/menu.png)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
