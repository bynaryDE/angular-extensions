const CLASS_SEPARATOR_REGEX = /\s+/;

/**
 * Splits the given classes into an array of classes.
 *
 * @param classes - The classes to split
 */
export const splitClasses = (classes: string | string[] | null | undefined) => {
    if (typeof classes !== 'string') {
        return classes;
    }

    return classes ? classes.split(CLASS_SEPARATOR_REGEX) : [];
};
