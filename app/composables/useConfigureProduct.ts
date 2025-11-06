import type {
    TApiProductConfigurableOptionAttributeCode,
    IApiProductConfigurableOptionValue,
    IApiProductConfigurableOption,
} from '@/types/apiProductConfigurable';
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';

export type TOptionState = 'disabled' | 'selected' | 'default';

interface IOption extends IApiProductConfigurableOptionValue {
    state: TOptionState;
    type: TApiProductConfigurableOptionAttributeCode;
}

export function useConfigureProduct(product: IClientProductConfigurable) {
    // const flatMapOptions = (options: IApiProductConfigurableOption[]) => options.flatMap(
    //     option => option.values.map(value => ({
    //         ...value,
    //         type: option.attribute_code,
    //         state: 'default',
    //     })),
    // );
    //
    // const options = ref<IOption[]>([]);
    // syncRef(toRef(product), options, {
    //     direction: 'ltr',
    //     transform: {
    //         ltr: product => flatMapOptions(product.configurable_options ?? []),
    //     },
    // });
    //
    // function findOption(id: number) {
    //     return options.value.find(option => option.value_index === id);
    // }
    //
    // const selectedOptionIds = ref<number[]>([]);
    //
    // const availableVariants = computed(() =>
    //     product.variants?.filter(v =>
    //         selectedOptionIds.value.every(id => v.attributes.flatMap(x => x.value_index).includes(id)),
    //     ),
    // );
    //
    // const availableVariantOptionsIds = computed(() => availableVariants.value?.flatMap(x => x.attributes.map(x => x.value_index)));
    //
    // function matchStatus(optionId: number): TOptionState {
    //     if (selectedOptionIds.value.includes(optionId)) {
    //         return 'selected';
    //     }
    //
    //     if (availableVariantOptionsIds.value?.includes(optionId)) {
    //         return 'default';
    //     }
    //
    //     return 'disabled';
    // }
    //
    // function toggleOption(optionId: number) {
    //     const isSelected = selectedOptionIds.value.includes(optionId);
    //
    //     if (isSelected) {
    //         selectedOptionIds.value = selectedOptionIds.value.filter(option => option !== optionId);
    //     } else {
    //         selectedOptionIds.value.push(optionId);
    //     }
    // }
    //
    // function onClickOption(optionId: number) {
    //     const option = findOption(optionId);
    //     if (!option) {
    //         throw new Error(`Option ${optionId} not found`);
    //     }
    //
    //     switch (option.state) {
    //         case 'default':
    //             return;
    //         case 'selected':
    //             return;
    //         case 'disabled':
    //             console.error(`Кликнут Option ${optionId} со статусом disabled`);   // В данном случае это не ошибка. Но зона ответственности компонента
    //             return;
    //     }
    // }

    ////////
    const selectedOptionIds = useState<number[]>(`selectedOptionIds-${product.id}`, () => []);

    const availableVariants = computed(() =>
        product.variants?.filter(v =>
            selectedOptionIds.value.every(id => v.attributes.flatMap(x => x.value_index).includes(id)),
        ),
    );

    const availableVariantOptionsIds = computed(() => availableVariants.value?.flatMap(x => x.attributes.map(x => x.value_index)));

    function matchStatus(optionId: number): TOptionState {
        if (selectedOptionIds.value.includes(optionId)) {
            return 'selected';
        }

        if (availableVariantOptionsIds.value?.includes(optionId)) {
            return 'default';
        }

        return 'disabled';
    }

    function forcedToggleOptions(mustSelect: boolean) {
        if (mustSelect) {
            selectedOptionIds.value = availableVariantOptionsIds.value ?? [];
        } else {
            selectedOptionIds.value = [];
        }
    }

    function select(optionId: number) {
        selectedOptionIds.value.push(optionId);

        if (availableVariants.value?.length == 1) {
            forcedToggleOptions(true);
        }
    }

    function unselect(optionId: number) {
        if (availableVariants.value?.length == 1) {
            forcedToggleOptions(false);
            return;
        }

        selectedOptionIds.value = selectedOptionIds.value.filter(option => option !== optionId);
    }

    function toggleOption(optionId: number) {
        const wasSelected = selectedOptionIds.value.includes(optionId);

        if (wasSelected) {
            unselect(optionId);
        } else {
            select(optionId);
        }


        // console.log('toggleOption', {
        //     optionId,
        //     isSelected,
        //     selectedOptionIds: toRaw(selectedOptionIds.value),
        //     status: matchStatus(optionId),
        //     options: toRaw(options.value),
        // });
    }

    const flatMapOptions = (options: IApiProductConfigurableOption[]) => options.flatMap(
        option => option.values.map(value => ({
            ...value,
            type: option.attribute_code,
            state: matchStatus(value.value_index),
        })),
    );

    const options = computed(() => flatMapOptions(product.configurable_options ?? []));

    const colorOptions = computed(() => options.value.filter(o => o.type == 'color'));
    const sizeOptions = computed(() => options.value.filter(o => o.type == 'size'));

    return {
        toggleOption,
        colorOptions,
        sizeOptions,
        availableVariants,
    };
}