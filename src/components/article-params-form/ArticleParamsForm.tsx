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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [stateForm, setStateForm] = useState(articleState);
	const formRef = useRef<HTMLDivElement>(null);

	const changeParamsForms =
		(elementName: keyof ArticleStateType) =>
		(value: OptionType): void => {
			setStateForm({ ...stateForm, [elementName]: value });
		};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onClose: () => setIsMenuOpen(!isMenuOpen),
		onChange: setIsMenuOpen,
	});

	const submitFrom = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(stateForm);
		setIsMenuOpen(false);
	};

	const toggleForm = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const resetForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(defaultArticleState);
		setStateForm(defaultArticleState);
		setIsMenuOpen(false);
	};

	return (
		<div ref={formRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					toggleForm();
				}}
			/>
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={submitFrom} onReset={resetForm}>
					<Text size={31} weight={800} align='center' uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={stateForm.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={changeParamsForms('fontFamilyOption')}
						title='Шрифт'
					/>

					<Select
						selected={stateForm.fontColor}
						options={fontColors}
						onChange={changeParamsForms('fontColor')}
						title='Цвет шрифта'
					/>

					<RadioGroup
						name={stateForm.fontSizeOption.className}
						options={fontSizeOptions}
						selected={stateForm.fontSizeOption}
						onChange={changeParamsForms('fontSizeOption')}
						title={'Размер Шрифта'}
					/>
					<Separator />

					<Select
						selected={stateForm.backgroundColor}
						options={backgroundColors}
						onChange={changeParamsForms('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={stateForm.contentWidth}
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
