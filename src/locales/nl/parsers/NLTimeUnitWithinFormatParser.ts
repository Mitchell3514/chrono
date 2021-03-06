import { TIME_UNITS_PATTERN, parseTimeUnits, FULL_TIME_UNITS_PATTERN } from "../../en/constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = createRegExp(TIME_UNITS_PATTERN);
const FULL_PATTERN = createRegExp(FULL_TIME_UNITS_PATTERN);

function createRegExp(pattern: string): RegExp {
    return new RegExp(`(?:binnen|in)\\s*` + "(" + pattern + ")" + `(?=\\W|$)`, "i");
}
export default class ENTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return context.option.useShorts ? FULL_PATTERN : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1], context.option.useShorts);
        return ParsingComponents.createRelativeFromRefDate(context.refDate, timeUnits);
    }
}
