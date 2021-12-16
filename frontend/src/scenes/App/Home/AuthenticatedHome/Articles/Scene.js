import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { ArticlesNavBar, ArticleNavSelect } from "./components";
import { DeviceContextConsumer, ArticleCardList, Loader, Button, Autocomplete, Tags, MultipleSelect } from "../../../../../components";
import { ArticlesActioner, UserVehiclesUtils } from "../../../../../services";
import { PATHS } from "../../../../../routes";
import { intersection, find } from "lodash"; 
import "./Scene.scss";

const mapping = {
    [PATHS.ARTICLES.ADVICE]: ['advice'],
    [PATHS.NEWS.ROOT]: ['news'],
    [PATHS.ARTICLES.TUTORIAL]: ['tutorial'],
    [PATHS.ARTICLES.ROOT]: ['tutorial', 'advice'],
};

const allowedFilters = [
    PATHS.ARTICLES.ADVICE,
    PATHS.ARTICLES.TUTORIAL,
    PATHS.ARTICLES.ROOT,
];

class Scene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            next: null,
            loading: false,
            path: null,
            categories: null,
            tags: [],
            selectedTags: [],
            vehicles: [],
            disableFilters: true,
            selectedVehicles: [],
        };
    }

    goToArticle = (type, slug) => type === 'news' ? this.props.history.push(PATHS.ARTICLE.buildNewsPath(slug)) : this.props.history.push(PATHS.ARTICLE.buildPath(slug));

    getArticles = (add = false) => {
        this.setState({ loading: true });

        if (!add) {
            this.props.resetArticles();
        }

        const vehicleModels = this.state.selectedVehicles.map((vehicle) => find(this.state.vehicles, {name: vehicle}));
        const tags = this.state.selectedTags.map((tag) => find(this.state.tags, {name: tag}));

        this.props.getArticles(this.state.next, {
            categories: this.state.categories,
            tags,
            vehicleModels,
        })
            .then((data) => {
                this.setState({
                    next: (data && data.next) || null,
                    loading: false,
                });
            })
            .then(() => {
                this.setState({
                    loading: false,
                });
            })
        ;
    };

    filterOptions = (option) => {
        let selectedTags = this.state.selectedTags;
        const index = selectedTags.indexOf(option);
        
        index > -1 ? selectedTags.splice(index, 1) : selectedTags.push(option);
        
        this.setState({selectedTags, next: null}, () => {
            this.getArticles()
        });
    };


    filterVehicles = ({options}) => {
        this.setState({selectedVehicles: options, next: null}, () => {
            this.getArticles();
        });
    };

    getCurrentPathFromMatch = () => {
        return this.props.match && this.props.match.path;
    };

    onOptionChanged = (category) => {
        const categories = mapping[category.value];
        this.setState({
            categories: categories,
            disableFilters: allowedFilters.indexOf(category.value) === -1,
            next: null,
        }, () => {
            this.initView();
        });
    };

    componentDidMount() {
        this.setState({
            categories: mapping[this.getCurrentPathFromMatch()],
            disableFilters: allowedFilters.indexOf(this.getCurrentPathFromMatch()) === -1,
        }, () => {
            this.initView();
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState({
                categories: mapping[nextProps.match.path],
                disableFilters: allowedFilters.indexOf(nextProps.match.path) === -1,
            }, () => {
                this.initView();
            });
        }
    };

    initView = () => {
        this.props.resetArticles();

        this.setState({ loading: true });

        this.props.getTags()
            .then((data) => {
                this.setState({
                    tags: data.tags,
                });
            })
            .then(() => {
                return this.props.getVehicles()
            })
            .then((data) => {
                const vehicles = data.vehicles.map(vehicle => vehicle.name);

                this.setState({
                    vehicles: data.vehicles,
                    selectedVehicles: intersection(this.props.userVehicles || [], vehicles),
                }, () => {
                    this.getArticles();
                });
            });
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };
                    const { loading, next, tags, selectedTags, selectedVehicles, vehicles, disableFilters } = this.state;
                    const { articles } = this.props;

                    return (
                    <div className="articles">
                        <h1 className={classnames({"articles-title": true, ...responsive})}>{this.props.t(this.props.title)}</h1>
                        
                        <div className="articles-nav">
                            {!disableFilters && <div className="articles-nav-block">
                                <div className="articles-filters">
                                    <Autocomplete 
                                        options={tags} 
                                        searchKey="name" 
                                        filterOptions={this.filterOptions} 
                                    />

                                    <MultipleSelect
                                        selectedOptions={selectedVehicles}
                                        label={this.props.t('fitlerByVehicle')}
                                        valueKey="id"
                                        labelKey="name"
                                        options={vehicles}
                                        filterOptions={this.filterVehicles}
                                    />
                                </div>
                            </div>}

                            <div className="articles-nav-block">
                                { this.getCurrentPathFromMatch().includes(PATHS.ARTICLES.ROOT) ?
                                    (
                                        isMobile ? (
                                            <ArticleNavSelect currentPath={this.getCurrentPathFromMatch()} onOptionChanged={this.onOptionChanged}/>
                                        ) : (
                                            <ArticlesNavBar currentPath={this.getCurrentPathFromMatch()} onOptionChanged={this.onOptionChanged}/>
                                        )
                                    ) : null
                                }
                            </div>
                        </div>

                        {!!selectedTags.length && (
                            <Tags tags={selectedTags} removeTag={this.filterOptions} />
                        )}

                        <section className={classnames({"articles-container": true, ...responsive})}>
                            <ArticleCardList articles={articles.toJS()} goToArticle={this.goToArticle}/>
                            { loading && (
                                <div className="deals-loader">
                                    <Loader />
                                </div>
                            )}
                            { next && <Button transparent center label={this.props.t("seeMoreButton")} onClick={() => this.getArticles(true)}/> }
                        </section>
                    </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

Scene.propTypes = {};

const connected = connect(
    (state) => ({
        articles: state.Articles,
        user: state.User.Informations,
        userVehicles: UserVehiclesUtils.getUserVehiclesNameFromState(state),
    }),
    (dispatch) => ({
        resetArticles : () => dispatch(ArticlesActioner.resetArticles()),
        getArticles : (next, params) => dispatch(ArticlesActioner.getArticles(next, params)),
        getTags : () => dispatch(ArticlesActioner.getTags()),
        getVehicles : () => dispatch(ArticlesActioner.getVehicles()),
    })
)(Scene);

const translated = translate("articles", { wait: true })(connected);
export { translated as Scene };
