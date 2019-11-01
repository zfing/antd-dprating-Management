import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    },
    {
      path: '/ratingReport',
      models: () => [import('./models/ratingReport')],
      component: () => import('./routes/ratingReport/'),
    },
    {
      path: '/applyRecord',
      models: () => [import('./models/applyRecord')],
      component: () => import('./routes/applyRecord/'),
    },
    {
      path: '/account',
      models: () => [import('./models/account')],
      component: () => import('./routes/account/'),
    },
    {
      path: '/accountUsers',
      models: () => [import('./models/accountUsers')],
      component: () => import('./routes/accountUsers/'),
    },
    {
      path: '/project',
      models: () => [import('./models/project')],
      component: () => import('./routes/project/'),
    },
    {
      path: '/dynamicContent',
      models: () => [import('./models/dynamicContent')],
      component: () => import('./routes/dynamicContent/'),
    },
    {
      path: '/exchange',
      models: () => [import('./models/exchange')],
      component: () => import('./routes/exchange/'),
    },
    {
      path: '/investmentAgency',
      models: () => [import('./models/investmentAgency')],
      component: () => import('./routes/investmentAgency/'),
    },
    {
      path: '/sowingMap',
      models: () => [import('./models/sowingMap')],
      component: () => import('./routes/sowingMap/'),
    },
    {
      path: '/friendlyLink',
      models: () => [import('./models/friendlyLink')],
      component: () => import('./routes/friendlyLink/'),
    },
    {
      path: '/analysis',
      models: () => [import('./models/analysis')],
      component: () => import('./routes/analysis/'),
    },
    {
      path: '/broke',
      models: () => [import('./models/broke')],
      component: () => import('./routes/broke/'),
    },
    {
      path: '/message',
      models: () => [import('./models/message')],
      component: () => import('./routes/message/'),
    },
    {
      path: '/createVote',
      models: () => [import('./models/createVote')],
      component: () => import('./routes/createVote/'),
    },
    {
      path: '/voteProject',
      models: () => [import('./models/voteProject')],
      component: () => import('./routes/voteProject/'),
    },
    {
      path: '/fileUpload',
      component: () => import('./routes/fileUpload/'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={enUS}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/applyRecord" />)} />
            {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
