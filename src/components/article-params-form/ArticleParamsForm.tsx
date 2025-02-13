import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { clsx } from 'clsx';
import {
	ArticleStateType,
	fontSizeOptions,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [state, setFormState] = useState(articleState);
	const formRef = useRef<HTMLDivElement>(null);

	const changeParamsForms =
		(elementName: keyof ArticleStateType) =>
		(value: OptionType): void => {
			setFormState({ ...state, [elementName]: value });
		};

	const submitFrom = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(state);
		setIsOpen(false);
	};

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	const resetForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<div ref={formRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					toggleForm();
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={submitFrom} onReset={resetForm}>
					<Text size={31} weight={800} align='center' uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={changeParamsForms('fontFamilyOption')}
						title='Шрифт'
					/>

					<Select
						selected={state.fontColor}
						options={fontColors}
						onChange={changeParamsForms('fontColor')}
						title='Цвет шрифта'
					/>

					<RadioGroup
						name={state.fontSizeOption.className}
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={changeParamsForms('fontSizeOption')}
						title={'Размер Шрифта'}
					/>
					<Separator />

					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={changeParamsForms('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						onChange={changeParamsForms('contentWidth')}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
