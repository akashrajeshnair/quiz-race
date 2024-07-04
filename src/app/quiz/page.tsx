import CommonComponent from '../(components)/CommonComponent';
import bComponent from '../(components)/Fill_In_The_BlanksComponent';
import matchComponent from '../(components)/Match_the FollowingComponent';
import MCQComponent from '../(components)/MCQComponent';
import quizAppStyles from '../quiz/quiz.module.css';
import BlankComponent from '../(components)/Fill_In_The_BlanksComponent.module.css';
import MatchComponent from '../(components)/Match_the_FollowingComponent.module.css';
import McqComponent from '../(components)/MCQComponent.module.css';
import Common from '../(components)/CommonComponent.module.css';

const quiz = () => {
    return (
        <div className={quizAppStyles.quizholder}>
            <div className={BlankComponent.fillInTheBlanksContainer}>
                <bComponent></bComponent>
            </div>
            <div className={MatchComponent.matchTheFollowingContainer}>
                <matchComponent></matchComponent>
            </div>
            <div className={McqComponent.mcqContainer}>
                <MCQComponent></MCQComponent>
            </div>
            <div className={Common.commonContainer}>
                <CommonComponent></CommonComponent>
            </div>
        </div>
    );
};

export default quiz;