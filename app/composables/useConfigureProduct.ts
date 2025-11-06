import type { IApiProductConfigurableOption } from '@/types/apiProductConfigurable';
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';

export type TOptionState = 'disabled' | 'selected' | 'default';

export function useConfigureProduct(product: IClientProductConfigurable) {
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