import json
import colorutils  # pip install colorutils
import requests  # pip install requests
from colorutils import Color

# NOTE RE: USER_PREFERENCES
# user_preferences  should be in dict format.
# relevant values: "main_color" int/float, "neon_pastel" bool, "light_dark" bool, "one_many_hues" bool, "num_colors" int, "bold_subtle" bool

# TO USE:
# THE COLOR PALETTE IS AUTOMATICALLY GENERATED FROM USER_PREFERENCES ON INITIALIZATION
# WARNING: THIS GENERATOR ASSUMES THAT ALL INPUTS ARE IN THE CORRECT FORMAT! SEE NOTE ABOVE
# THERE ARE GETTERS FOR THE COLOR PALETTE AND BASE COLOR. USE THEM!

# 21-OCT-2021: currently generates a base color + grabs the relevant palette from thecolorapi.com.
# does not yet edit the palette colors for contrast

# TODO: include bold/subtle in the palette editing phase i.e. high/low value contrast levels


class colorPalette:
    def __init__(self, user_preferences):  # userprefs should be in dict format
        # DEFINE VARIABLES:
        self.baseColor = Color(hex="0047AB")
        self.colorList = []  # list of hex elements to be filled
        self.userPrefs = user_preferences
        # TODO this will be a user_preferences variable once i get hex codes running
        self.customHex = False
        self.ValueAdjustmentLists = [
            [0, .20, -.12, .1, -.15, .1],  # light/bold
            [0, .17, -.08, .07, -.1, .07],  # light/subtle
            [0, -.1, .12, .15, .07, .07],  # dark/bold
            [0, -.05, .1, .1, .05, .05]  # dark/subtle
        ]

        # base color setup
        if self.customHex == True:
            self.assignBaseColor()
        else:
            self.createBaseColor()

        # if there's only one color, don't bother
        if self.userPrefs["num_colors"] > 1:
            self.api_TCA_call()
            self.paletteSort()
            self.paletteAdjust()

    # step 1: from user inputs, generate base color

    def createBaseColor(self):
        hsvValue = [0, 0, 0]

        # whatever main_color hue is
        hsvValue[0] = self.userPrefs["main_color"]

        # if pastel preference is true
        if self.userPrefs["neon_pastel"] == True:
            hsvValue[1] = .40
        else:
            hsvValue[1] = .95

        # if dark mode preference is true
        if self.userPrefs["light_dark"] == True:
            hsvValue[2] = .40
        else:
            hsvValue[2] = .68

        self.baseColor = colorutils.Color(
            hsv=(hsvValue[0], hsvValue[1], hsvValue[2]))
        # husl.husl_to_hex(
        #    hsvValue[0], hsvValue[1], hsvValue[2])
        self.colorList.append(self.baseColor.hex[1:])
        return

    # step 1 alt: given a custom hex code, assign it to basecolor and determine light/dark

    def assignBaseColor(self):
        # TODO hex will be read in from userprefs
        self.baseColor = colorutils.Color(hex="0047AB")
        self.colorList.append(self.baseColor.hex[1:])

        # determine light/dark by value (TODO: account for human perception of purple vs yellow?? if hue is between certain values?)
        if self.getBaseColorValue > .5:
            self.userPrefs["light_dark"] = False
        else:
            self.userPrefs["light_dark"] = True

        return

    # step 2: from base color + user inputs, api color palette

    def api_TCA_call(self):
        url = "https://www.thecolorapi.com/scheme?hex="
        url += self.colorList[0]  # baseColor hex
        url += "&format=json&mode="
        # choose appropriate palette type based on user preferences. HC'd to analogic atm

        # if many hues is true
        if self.userPrefs["one_many_hues"] == True:
            url += "analogic-complement"
        else:
            url += "analogic"

        colorCount = self.userPrefs["num_colors"] - 1
        TCA_Error = False
        if colorCount == 0:
            print("error: no palette. break")
            return
        if colorCount == 1:
            # TCA's api returns more than 1 color if you query for one
            TCA_Error = True
            colorCount = 2

        # replace '6' with user preference num_colors - 1
        url += "&count=" + str(colorCount)

        jsonResp = requests.get(url)

        jsonLoad = jsonResp.json()

        # print("jsonLoad ", jsonLoad)

        if TCA_Error:
            # TCA error: pull ONLY first color
            color = jsonLoad["colors"][0]
            if self.userPrefs["one_many_hues"] != True:
                # analogic: pull 2nd color instead bc it looks better 8^)
                color = jsonLoad["colors"][1]
            self.colorList.append(color["hex"]["clean"])

        else:
            # TCA generates a normal palette. behave normally
            for color in jsonLoad["colors"]:
                self.colorList.append(color["hex"]["clean"])

        # TODO: possibly futz with analogic-complement to get more of the original value in there?
        # colorList should now be a list of hex codes

        print(self.colorList)

        return

    # step 3: sort colors to match specific roles in the ui
    def paletteSort(self):
        # rearrange the colors in the palette so that they meet the following order:
        # 1. main windows, 2. background 3. main buttons, 4. alerts, 5. a header/footer, 6. secondary windows
        # this order will be dependent on user preferences (i.e. light or dark mode)
        # TCA generally more or less returns palettes in order from darkest to lightest color

        # if light mode is selected
        if self.userPrefs["light_dark"] == False:
            # as a starting point, let's just flip the colors for light mode
            # WITH THE EXCEPTION of the original color
            self.colorList[1:].reverse()

    # step 4: now that colors are assigned, adjust colors for better contrast
    def paletteAdjust(self):
        # reminder to self: 1. main windows, 2. background 3. main buttons
        # 4. alerts, 5. a header/footer, 6. secondary windows

        # overall edits:
        # increase alert saturation by .10, button saturation by .05
        # decrease secondary window saturation by .05
        if len(self.colorList) >= 3:
            self.colorList[2] = self.adjustColor(self.colorList[2], 's', .05)
        if len(self.colorList) >= 4:
            self.colorList[3] = self.adjustColor(self.colorList[3], 's', .1)
        if len(self.colorList) >= 6:
            self.colorList[5] = self.adjustColor(self.colorList[5], 's', -.05)

        # LIGHT VS DARK MODE tweaks for all settings
        valueAdjustments = self.ValueAdjustmentLists[0]

        # find appropriate adjustment list
        if (self.userPrefs["light_dark"] == False and self.userPrefs["bold_subtle"] == False):
            # light/bold
            valueAdjustments = self.ValueAdjustmentLists[0]
        elif (self.userPrefs["light_dark"] == False and self.userPrefs["bold_subtle"] == True):
            # light/subtle
            valueAdjustments = self.ValueAdjustmentLists[1]
        elif (self.userPrefs["light_dark"] == True and self.userPrefs["bold_subtle"] == False):
            # dark/bold
            valueAdjustments = self.ValueAdjustmentLists[2]
        else:
            # dark/subtle
            valueAdjustments = self.ValueAdjustmentLists[3]

        # now that we have the right list, make the adjustments
        if len(self.colorList) >= 2:  # background
            self.colorList[1] = self.adjustColor(
                self.colorList[1], 'v', valueAdjustments[1])
        if len(self.colorList) >= 3:  # buttons
            self.colorList[2] = self.adjustColor(
                self.colorList[2], 'v', valueAdjustments[2])
        if len(self.colorList) >= 4:  # alert
            self.colorList[3] = self.adjustColor(
                self.colorList[3], 'v', valueAdjustments[3])
        if len(self.colorList) >= 5:
            self.colorList[4] = self.adjustColor(
                self.colorList[4], 'v', valueAdjustments[4])
        if len(self.colorList) >= 6:  # secondary window
            self.colorList[5] = self.adjustColor(
                self.colorList[5], 'v', valueAdjustments[5])

    # CALL THIS FUNCTION IN ORDER TO ADJUST A COLOR HEX
    # THIS WILL RETURN THE ADJUSTED COLOR HEX, NO HASH
    # colorHex should be the hex, no hashtag
    # thingToAdjust should be either: 'h', 's', or 'v'
    # AdjustBy should be negative if wanting to decrement

    def adjustColor(self, colorHex, thingToAdjust, AdjustBy):
        startColor = Color(hex=colorHex)
        fixColorHsvTuple = startColor.hsv
        # make it a list so we can edit it
        fixColorHsv = [fixColorHsvTuple[0],
                       fixColorHsvTuple[1], fixColorHsvTuple[2]]

        if thingToAdjust == 'h':
            fixColorHsv[0] += AdjustBy

            # overflow edge cases
            if fixColorHsv[0] > 359:
                fixColorHsv[0] -= 360
            elif fixColorHsv[0] < 0:
                fixColorHsv[0] += 360

        elif thingToAdjust == 's':
            fixColorHsv[1] += AdjustBy

            # avoid edge cases
            if fixColorHsv[1] > 1:
                fixColorHsv[1] = 1
            elif fixColorHsv[1] < 0:
                fixColorHsv[1] = 0

        else:
            fixColorHsv[2] += AdjustBy

            # avoid edge cases
            if fixColorHsv[2] > 1:
                fixColorHsv[2] = 1
            elif fixColorHsv[2] < 0:
                fixColorHsv[2] = 0

        newColor = colorutils.Color(
            hsv=(fixColorHsv[0], fixColorHsv[1], fixColorHsv[2]))
        # print("DOUGDEBUG", fixColorHsvTuple, fixColorHsv, newColor.hex[1:])
        return newColor.hex[1:]

    #####################################
    ### functions for returning stuff ###
    #####################################

    def getPalettes(self):
        return self.colorList

    def getBaseColor(self):
        return self.baseColor.hex[1:]

    def getBaseColorHSV(self):
        return self.baseColor.hsv

    def getBaseColorHue(self):
        return self.baseColor.hsv[0]

    def getBaseColorValue(self):
        return self.baseColor.hsv[2]

    def getJsonPalettes(self):
        return json.dumps(self.colorList)
