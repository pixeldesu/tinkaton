# Contribution Guidelines

_If you are here I assume you want to contribute to Tinkaton, which is already much appreciated!_

There are several ways in which you can contribute to the project:

* [Request a new Feature](#request-a-new-feature) (Supporting a framework, library functionality, etc. ...)
* [Report Bugs](#report-bugs)
* [Implement a new Extractor](#implement-a-new-extractor)
* [Fix a Bug](#fix-a-bug)

## Request a new Feature

Use the relevant issue form when creating an issue and be sure to check the README if it already exists or the issue list if it already has been requested.

## Report Bugs

Use the relevant issue from when creating an issue and be sure to check the issue list if the bug has already been reported.

## Implement a new Extractor

You can help extending the functionality of Tinkaton with adding extractors for more frameworks!

Simply create a new file in the folder `src/extractors/` and extend from the `AbstractExtractor` found in `src/extractors/_abstract.ts`. This class requires you to set the `type` class member string and implement the `detect` and `extract` methods.

In order to ensure properly formatted responses in the given function calls, you can use the methods `buildDetectionResult` in the detection method and `buildExtractionResult` in the extract method.

_Check out the other extractors in the folder for inspiration on how different detections/extractions work!_

Once you are ready to submit your change to the project, follow the [Pull Requests](#pull-requests) guide.

## Fix a Bug

If you found a bug, or want to fix a already found bug, you are free to do so!

Once you are ready to submit your change to the project, follow the [Pull Requests](#pull-requests) guide.

## Pull Requests

1. [Fork the Repository](https://github.com/pixeldesu/tinkaton/fork)
2. Create a branch for your change
3. Make and commit your changes
  * This project uses ESLint and Prettier, make sure your changes follow the project coding standards by using `npm run lint` and `npm run format-check`.
  * _In case you don't do this beforehand, GitHub Actions will check for this anyway!_
4. [Create a Pull Request](https://github.com/pixeldesu/tinkaton/compare)

Please try to have your commits as tidy as possible beforehand. I try to rebase/merge regularly as much as possible, but if you have a messy history in your Pull Request or otherwise unclear commits I reserve the right to just squash the branch instead.