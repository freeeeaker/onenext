import React, { PureComponent } from 'react'
import Article from '@component/Article'

export default class UpdateOnAsyncRendering extends PureComponent {
  static displayName = "关于异步渲染的更新"
  render () {
    return (
      <Article
        title='异步渲染的更新'
        time='03/27/2018'
        author='Brian Vaughn'
      >
        <blockquote>
          有一年时间， React 团队致力于实现异步渲染。上个月在冰岛 JSConf 上的谈话中， Dan 揭幕了一些令人兴奋的异步渲染新可能。
          现在我们想分享一些我们工作中研究这些特性收获的一些经验。希望当异步渲染发布时，这些秘籍能帮助你快速上手。
        </blockquote>
        <p>我们认识到最大的问题就是有些遗留的组件生命周期会倾向于鼓励不安全的代码实践，比如：</p>
        <ul>
          <li><code>componentWillMount</code></li>
          <li><code>componentWillReceiveProps</code></li>
          <li><code>componentWillUpdate</code></li>
        </ul>
        <p>这些生命周期方法经常被错误理解或者使用；此外，我们期望他们的潜在错用能够在异步渲染时更明显看出错误。因此，我们在接下来的版本添加了 "UNSAFE_" 前缀给这些方法（这里，"unsafe" 不是指不安全而是表达用了这些生命周期的代码在接下来的 React 版本更容易有 bug， 尤其在开启异步渲染时）</p>
        <h3>渐进迁移路线</h3>
        <p> React 遵循下列语义版本迭代， 所以改变时渐进的，我们当前的计划是：</p>
        <ul>
          <li><b>16.3:</b>引入 unsafe 生命周期的别名， <code>UNSAFE_componentWillMount</code>, <code>UNSAFE_componentWillReceiveProps</code>,<code>UNSAFE_componentWillUpdate</code>。（这个版本新旧都可用）</li>
          <li><b>未来 16.x 发版:</b> 开启给<code>UNSAFE_componentWillMount</code>, <code>UNSAFE_componentWillReceiveProps</code>,<code>UNSAFE_componentWillUpdate</code> 的弃用警告。(新旧都可用，但旧方法在 DEV 模式有警告)</li>
          <li><b>17.0:</b> 移除<code>UNSAFE_componentWillMount</code>, <code>UNSAFE_componentWillReceiveProps</code>,<code>UNSAFE_componentWillUpdate</code>（只有 "UNSAFE_" 前缀的能用）</li>
        </ul>
        <p><b>注意，如果你是一个 React 应用开发者，你不需要担心还在的旧方法。接下来到来的16.3版本主要目的是使开源项目的维护者在弃用警告更新他们的库。这些警告在 16.x 版本前不会开启</b></p>
        <hr/>
        <h3>从旧方法迁移</h3>
        <p>如果你想开始使用 React 16.3 引入的新生命周期方法 (或者你是一个维护者想在你的库中提前使用)。这里有些例子我们希望可以帮助你思考组件间的细小差异。有很多次，我们都计划添加一个额外的 秘诀 到我们的文档上， 展示如何用一种避免错误的生命周期执的方法去演示一些普通任务</p>
        <p>在此之前，这里有一个 v16.3 生命周期方法改变计划的快速预览</p>
        <ul>
          <li>我们添加了下列生命周期的别名: <code>UNSAFE_componentWillMount</code>, <code>UNSAFE_componentWillReceiveProps</code>,<code>UNSAFE_componentWillUpdate</code></li>
          <li>我们引入了两个新的生命周期， static <code>getDerivedStateFromProps</code>和<code>getSnapshotBeforeUpdate</code></li>
        </ul>
        <h3>新生命周期：getDerivedStateFromProps</h3>
        <pre
          dangerouslySetInnerHTML={{
            __html: `\
            class Example extends React.Component {
              static getDerivedStateFromProps(props, state) {
                // ...
              }
            }`
          }}
        />
        <p>新的静态生命周期 <code>getDerivedStateFromProps</code> 在组件实例化后会执行， 也会在每次再渲染前执行。它能返回一个对象更新到 <code>state</code>上，或者返回一个 <code>null</code>表示新的 <code>props</code>不会要求 <code>state</code>更新</p>
        <blockquote>
          <h5>Note：</h5>
          <p><code>componentWillReceiveProps</code>和<code>getDerivedStateFromProps</code>都会有效增加组件复杂性。这通常导致 bugs。 考虑 <a href="https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html" rel="noopener noreferrer" target="_blank">simpler alternatives to derived state</a> 让组件可预测与维护</p>
        </blockquote>
        <h3>新生命周期：getSnapshotBeforeUpdate</h3>
        <pre
          dangerouslySetInnerHTML={{
            __html: `\
            class Example extends React.Component {
              getSnapshotBeforeUpdate(props, state) {
                // ...
              }
            }`
          }}
        />
        <p>新生命周期<code>getSnapshotBeforeUpdate</code>会刚好在变化更新前(比如 DOM更新前)调用。返回值会被作为 <code>componentDidUpdate</code>的第三个参数(这个生命周期不长使用，但是在某些情况下有用，比如在再次渲染间，手动保存滚动位置)</p>
        <p>与<code>componentDidUpdate</code>一起， 这个生命周期会会覆盖 <code>componentWillUpdate</code>所有使用情况</p>
        <p>你能找到他们的类型签名 <a href="https://gist.github.com/gaearon/88634d27abbc4feeb40a698f760f3264" rel="noopener noreferrer" target="_blank">在这个页面</a></p>
        <hr/>
        <h3>案例</h3>
        <ul>
          <li><a href="#InitializingState" >Initializing state</a></li>
          <li><a href="#FetchingExternalData" >Fetching external data</a></li>
          <li><a href="#/" >Adding event listeners (or subscriptions)</a></li>
          <li><a href="#/" >Updating state based on props</a></li>
          <li><a href="#/" >Invoking external callbacks</a></li>
          <li><a href="#/" >Side effects on props change</a></li>
          <li><a href="#/" >Fetching external data when props change</a></li>
          <li><a href="#/" >Reading DOM properties before an update</a></li>
        </ul>
        <blockquote>
          <h5>Note</h5>
          <p>简便起见，下列例子的写法使用了实验性质的类属性转换。但没有它相同的迁移策略也能应用</p>
        </blockquote>
        <h3 id="InitializingState">初始化状态</h3>
        <p>这个例子展示了在 <code>componentWillMount</code> 内调用 <code>setState</code></p>
        <pre
          dangerouslySetInnerHTML={{
            __html: `\
            // Before
            class ExampleComponent extends React.Component {
              state = {};

              componentWillMount() {
                this.setState({
                  currentColor: this.props.defaultColor,
                  palette: 'rgb',
                });
              }
            }`
          }}
        />
        <p>这种组件最简单的重构是把状态初始化移到 constructor 或者 属性初始化，比如</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // After
          class ExampleComponent extends React.Component {
            state = {
              currentColor: this.props.defaultColor,
              palette: 'rgb',
            };
          }
          `}}
        />
        <h3 id="FetchingExternalData">获取内部数据</h3>
        <p>这里有个例子是在 <code>componentWillMount</code>内获取数据</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // Before
          class ExampleComponent extends React.Component {
            state = {
              externalData: null,
            };

            componentWillMount() {
              this._asyncRequest = loadMyAsyncData().then(
                externalData => {
                  this._asyncRequest = null;
                  this.setState({externalData});
                }
              );
            }

            componentWillUnmount() {
              if (this._asyncRequest) {
                this._asyncRequest.cancel();
              }
            }

            render() {
              if (this.state.externalData === null) {
                // Render loading state ...
              } else {
                // Render real UI ...
              }
            }
          }
          `}}
        />
        <p>上述代码在服务端渲染(内部数据不可用)和接下来的异步渲染模式(请求可能被出事多次)都有问题</p>
        <p>对大多数案例推荐的升级路线是把数据请求移到<code>componentDidMount</code></p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // After
          class ExampleComponent extends React.Component {
            state = {
              externalData: null,
            };

            componentDidMount() {
              this._asyncRequest = loadMyAsyncData().then(
                externalData => {
                  this._asyncRequest = null;
                  this.setState({externalData});
                }
              );
            }

            componentWillUnmount() {
              if (this._asyncRequest) {
                this._asyncRequest.cancel();
              }
            }

            render() {
              if (this.state.externalData === null) {
                // Render loading state ...
              } else {
                // Render real UI ...
              }
            }
          }
          `}}
        />
        <p>有一个普遍的误解即在 <code>componentWillMount</code> 中获取数据回让你在第一次渲染时避免空状态。事实上因为 React 会在 <code>componentWillMount</code> 后立刻出发 <code>render</code> 所以这绝不会发生。如果数据在 <code>componentWillMount</code>之前就不可用，那第一次渲染将一直展示一个 loading ，忽略初始化请求。这就是为什么把请求数据移到 <code>componentDidMount</code>在极大多数场景下没有什么影响</p>
        <blockquote>
          <h5>Note</h5>
          <p>有一些先进的使用案例（Relay 库）想急切体验 获取异步数据。这里有一个可用<a href="https://gist.github.com/bvaughn/89700e525ff423a75ffb63b1b1e30a8f" rel="noopener noreferrer" target="_blank">例子</a></p>
          <p>长远看来，权威的方法去在 React components 中获取组件将基于 冰岛 JSConf 介绍的 "suspense" API。 Apollo 和 Relay 这两个简单的数据获取方法库都会使用。比起上述方法，它能显著减少冗余，但在 v16.3之前不会定稿</p>
          <p>当支持服务端渲染时，很明显有必要同步提供数据。 <code>componentWillMount</code>经常用于这个目的。但是可以用 constructor 代替。即将到来的 suspense API 将使得在客户端或服务端获取数据都尽可能简洁</p>
        </blockquote>
        <h3>添加事件监听(或订阅)</h3>
        <p>这里有一个组件例子，在挂载的时候订阅了一个内部事件分发器</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // Before
          class ExampleComponent extends React.Component {
            componentWillMount() {
              this.setState({
                subscribedValue: this.props.dataSource.value,
              });

              // This is not safe; it can leak!
              this.props.dataSource.subscribe(
                this.handleSubscriptionChange
              );
            }

            componentWillUnmount() {
              this.props.dataSource.unsubscribe(
                this.handleSubscriptionChange
              );
            }

            handleSubscriptionChange = dataSource => {
              this.setState({
                subscribedValue: dataSource.value,
              });
            };
          }
          `}}
        />
        <p>不幸的是， 这个在服务端渲染(<code>componentWillUnmount</code>不会调用)和异步渲染(在完成之前渲染可能会中断，导致<code>componentWillUnmount</code>不会调用)的时候可能会导致内存泄漏</p>
        <p>人们通常会假设<code>componentWillMount</code>和<code>componentWillUnmount</code>是成对的，但是这是无法保证的。只有当<code>componentDidMount</code>调用， React 才会确保 <code>componentWillUnmount</code>随后会调用</p>
        <p>为此，推荐的方法是在 <code>componentDidMount</code>内添加监听和订阅</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // After
          class ExampleComponent extends React.Component {
            state = {
              subscribedValue: this.props.dataSource.value,
            };

            componentDidMount() {
              // Event listeners are only safe to add after mount,
              // So they won't leak if mount is interrupted or errors.
              this.props.dataSource.subscribe(
                this.handleSubscriptionChange
              );

              // External values could change between render and mount,
              // In some cases it may be important to handle this case.
              if (
                this.state.subscribedValue !==
                this.props.dataSource.value
              ) {
                this.setState({
                  subscribedValue: this.props.dataSource.value,
                });
              }
            }

            componentWillUnmount() {
              this.props.dataSource.unsubscribe(
                this.handleSubscriptionChange
              );
            }

            handleSubscriptionChange = dataSource => {
              this.setState({
                subscribedValue: dataSource.value,
              });
            };
          }
          `}}
        />
        <p>有时候随着属性变化更新订阅很重要。如果你正在使用类似 Redux 或者 MobX 这种库，库的容器组件应该为你处理这些。对于应用作者， 我们创建了一个小库  <a href="https://github.com/facebook/react/tree/master/packages/create-subscription" target="_blank" rel="noopener noreferrer"></a> 来处理这个。将随 React v16.3 发布</p>
        <p>比起如上个例子，传递一个可订阅的 <code>dataSource</code> 属性，我们可以用 <code>create-subscription</code>去传递已订阅的值</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // Before
          import {createSubscription} from 'create-subscription';

          const Subscription = createSubscription({
            getCurrentValue(sourceProp) {
              // Return the current value of the subscription (sourceProp).
              return sourceProp.value;
            },

            subscribe(sourceProp, callback) {
              function handleSubscriptionChange() {
                callback(sourceProp.value);
              }

              // Subscribe (e.g. add an event listener) to the subscription (sourceProp).
              // Call callback(newValue) whenever a subscription changes.
              sourceProp.subscribe(handleSubscriptionChange);

              // Return an unsubscribe method.
              return function unsubscribe() {
                sourceProp.unsubscribe(handleSubscriptionChange);
              };
            },
          });

          // Rather than passing the subscribable source to our ExampleComponent,
          // We could just pass the subscribed value directly:
          <Subscription source={dataSource}>
            {value => <ExampleComponent subscribedValue={value} />}
          </Subscription>;
          `}}
        />
        <blockquote>
          <h5>Note</h5>
          <p>像 Relay/Apollo 这样的库 应该手动管理， 与 <code>create-subscription</code>暗地里使用了同样的技术， 这种方式是最优化的</p>
        </blockquote>
        <h3>基于 props 更新 state</h3>
        <h5>Note:</h5>
        <p>这里有一个组件例子使用了遗留的 <code>componentWillReceiveProps</code> 生命周期去基于新的 props 更新 state</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // Before
          class ExampleComponent extends React.Component {
            state = {
              isScrollingDown: false,
            };

            componentWillReceiveProps(nextProps) {
              if (this.props.currentRow !== nextProps.currentRow) {
                this.setState({
                  isScrollingDown:
                    nextProps.currentRow > this.props.currentRow,
                });
              }
            }
          }

          `}}
        />
        <p>尽管上述代码本身没问题，但是 <code>componentWillReceiveProps</code>生命周期经常被错误使用而出现问题。因此，这个方法将被弃用</p>
        <p>由于 v16.3, 基于 props 更新 state 的推荐方法是 新的 <code>static getDerivedStateFromProps</code> 生命周期。（这个生命周期将在组件被创建和每次接收新props是调用）</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // After
          class ExampleComponent extends React.Component {
            // Initialize state in constructor,
            // Or with a property initializer.
            state = {
              isScrollingDown: false,
              lastRow: null,
            };

            static getDerivedStateFromProps(props, state) {
              if (props.currentRow !== state.lastRow) {
                return {
                  isScrollingDown: props.currentRow > state.lastRow,
                  lastRow: props.currentRow,
                };
              }

              // Return null to indicate no change to state.
              return null;
            }
          }
          `}}
        />
        <p>你可能主要到在上面的例子中 <code>props.currentRow</code>被 镜像到 state里。 这使得 <code>getDerivedStateFromProps</code> 能访问前一个 props 的值，与 <code>componentWillReceiveProps</code> 一样</p>
        <p>你可能好奇为什么我们不传递前一个 props 作为参数给 <code>getDerivedStateFromProps</code>。我们在设计这个 API 的时候考虑到了这个观点，但是最终决定不这么做有两点：</p>
        <ul>
          <li>一个 <code>prevProps</code> 参数在第一次 <code>getDerivedStateFromProps</code>被调用(实例化)的时候可能是 null。这样每次访问 <code>prevProps</code> 都要做一次非空检测</li>
          <li>不传递 prevProps 给函数是一个在将来 React 版本中 释放内存的一步。（如果 React 不需要传递 prevProps 给生命周期，那么它就不需要保存在内存中）</li>
        </ul>
        <blockquote>
          <h5>Note:</h5>
          <p>如果你正在写一个共享组件，<a href="https://github.com/reactjs/react-lifecycles-compat" target="_blank" rel="noopener noreferrer"></a> 会让老版本 React 也能使用 <code>getDerivedStateFromProps</code><a href="https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#open-source-project-maintainers" target="_blank" rel="noopener noreferrer">了解更多</a></p>
        </blockquote>
        <h3>执行内部回调</h3>
        <p>这里有一个组件当它的内部状态改变时会调用内部函数</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // Before
          class ExampleComponent extends React.Component {
            componentWillUpdate(nextProps, nextState) {
              if (
                this.state.someStatefulValue !==
                nextState.someStatefulValue
              ) {
                nextProps.onChange(nextState.someStatefulValue);
              }
            }
          }
          `}}
        />
        <p>有时人们使用 <code>componentWillUpdate</code> 是因为错误的担心，当 <code>componentDidUpdate</code> 触发时，更新其他组件的状态“为时已晚”。 不是这种情况。 React 确保在用户看到更新的UI之前刷新在 <code>componentDidMount</code> 和 <code>componentDidUpdate</code>期间发生的任何setState调用。 通常，最好避免像这样的级联更新，但在某些情况下它们是必要的（例如，如果需要在测量渲染的 DOM 元素后定位工具提示）</p>
        <p>不论怎样， 在异步模式，为了这个目的使用 <code>componentWillUpdate</code>是不安全的。 因为内部的回调因为一次更新可能被调用多次。反而，应该使用 <code>componentDidUpdate</code> 生命周期因为它能确保每次更新只执行一次</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // After
          class ExampleComponent extends React.Component {
            componentDidUpdate(prevProps, prevState) {
              if (
                this.state.someStatefulValue !==
                prevState.someStatefulValue
              ) {
                this.props.onChange(this.state.someStatefulValue);
              }
            }
          }
          `}}
        />
        <p> props 改变的副作用</p>
        <p>和上面的例子很像，有时候组件 props 改变会导致副作用</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // Before
          class ExampleComponent extends React.Component {
            componentWillReceiveProps(nextProps) {
              if (this.props.isVisible !== nextProps.isVisible) {
                logVisibleChange(nextProps.isVisible);
              }
            }
          }
          `}}
        />
        <p>像 <code>componentWillUpdate</code> <code>componentWillReceiveProps</code> 可能因为一个更新调用多次。因此，有必要避免在这个方法中放入副作用。反而，<code>componentDidUpdate</code> 应该被使用，因为它能确保更新每次只调用一次</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // After
          class ExampleComponent extends React.Component {
            componentDidUpdate(prevProps, prevState) {
              if (this.props.isVisible !== prevProps.isVisible) {
                logVisibleChange(this.props.isVisible);
              }
            }
          }
          `}}
        />
        <h3>当 props 改变时 获取内部数据</h3>
        <p>这里有一个基于 props 改变而获取 内部 data 的例子</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // Before
          class ExampleComponent extends React.Component {
            state = {
              externalData: null,
            };

            componentDidMount() {
              this._loadAsyncData(this.props.id);
            }

            componentWillReceiveProps(nextProps) {
              if (nextProps.id !== this.props.id) {
                this.setState({externalData: null});
                this._loadAsyncData(nextProps.id);
              }
            }

            componentWillUnmount() {
              if (this._asyncRequest) {
                this._asyncRequest.cancel();
              }
            }

            render() {
              if (this.state.externalData === null) {
                // Render loading state ...
              } else {
                // Render real UI ...
              }
            }

            _loadAsyncData(id) {
              this._asyncRequest = loadMyAsyncData(id).then(
                externalData => {
                  this._asyncRequest = null;
                  this.setState({externalData});
                }
              );
            }
          }
          `}}
        />
        <p>这个组件推荐的升级路线是把数据更新移到 <code>componentDidUpdate</code> 你也可以使用 <code>getDerivedStateFromProps</code> 生命周期在渲染新 props 前去清除 旧数据</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          // After
          class ExampleComponent extends React.Component {
            state = {
              externalData: null,
            };

            static getDerivedStateFromProps(props, state) {
              // Store prevId in state so we can compare when props change.
              // Clear out previously-loaded data (so we don't render stale stuff).
              if (props.id !== state.prevId) {
                return {
                  externalData: null,
                  prevId: props.id,
                };
              }

              // No state update necessary
              return null;
            }

            componentDidMount() {
              this._loadAsyncData(this.props.id);
            }

            componentDidUpdate(prevProps, prevState) {
              if (this.state.externalData === null) {
                this._loadAsyncData(this.props.id);
              }
            }

            componentWillUnmount() {
              if (this._asyncRequest) {
                this._asyncRequest.cancel();
              }
            }

            render() {
              if (this.state.externalData === null) {
                // Render loading state ...
              } else {
                // Render real UI ...
              }
            }

            _loadAsyncData(id) {
              this._asyncRequest = loadMyAsyncData(id).then(
                externalData => {
                  this._asyncRequest = null;
                  this.setState({externalData});
                }
              );
            }
          }
          `}}
        />
        <blockquote>
          <h5>Note:</h5>
          <p>如果你正在使用支持取消请求的 HTTP 库，比如 axios， 那么很简单在 mounting 中取消正在发送的请求。对于原生 native Promise, 你可以使用这个 <a href="https://gist.github.com/bvaughn/982ab689a41097237f6e9860db7ca8d6" target="_blank" rel="noopener noreferrer">方法</a> </p>
        </blockquote>
        <h3>在更新前读取 DOM 属性</h3>
        <p>如下例子</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          class ScrollingList extends React.Component {
            listRef = null;
            previousScrollOffset = null;
          
            componentWillUpdate(nextProps, nextState) {
              // Are we adding new items to the list?
              // Capture the scroll position so we can adjust scroll later.
              if (this.props.list.length < nextProps.list.length) {
                this.previousScrollOffset =
                  this.listRef.scrollHeight - this.listRef.scrollTop;
              }
            }
          
            componentDidUpdate(prevProps, prevState) {
              // If previousScrollOffset is set, we've just added new items.
              // Adjust scroll so these new items don't push the old ones out of view.
              if (this.previousScrollOffset !== null) {
                this.listRef.scrollTop =
                  this.listRef.scrollHeight -
                  this.previousScrollOffset;
                this.previousScrollOffset = null;
              }
            }
          
            render() {
              return (
                <div ref={this.setListRef}>
                  {/* ...contents... */}
                </div>
              );
            }
          
            setListRef = ref => {
              this.listRef = ref;
            };
          }
          `}}
        />
        <p>在上面例子中， <code>componentWillUpdate</code> 被用于读取 DOM 属性。然而，在 异步渲染中， 在 “渲染” 阶段的生命周期（比如 componentWillUpdate 和 render) 与 “提交” 阶段的生命周期(如 componentDidUpdate) 有延迟。 如果用户在这段期间进行了 窗口尺寸重置，那么 从 componentWillUpdate 里获取的 scrollHeight 是旧的</p>
        <p>两个声明周期结合用</p>
        <pre dangerouslySetInnerHTML={{
          __html: `\
          class ScrollingList extends React.Component {
            listRef = null;
          
            getSnapshotBeforeUpdate(prevProps, prevState) {
              // Are we adding new items to the list?
              // Capture the scroll position so we can adjust scroll later.
              if (prevProps.list.length < this.props.list.length) {
                return (
                  this.listRef.scrollHeight - this.listRef.scrollTop
                );
              }
              return null;
            }
          
            componentDidUpdate(prevProps, prevState, snapshot) {
              // If we have a snapshot value, we've just added new items.
              // Adjust scroll so these new items don't push the old ones out of view.
              // (snapshot here is the value returned from getSnapshotBeforeUpdate)
              if (snapshot !== null) {
                this.listRef.scrollTop =
                  this.listRef.scrollHeight - snapshot;
              }
            }
          
            render() {
              return (
                <div ref={this.setListRef}>
                  {/* ...contents... */}
                </div>
              );
            }
          
            setListRef = ref => {
              this.listRef = ref;
            };
          }
          `}}
        />
      </Article>
    )
  }
}