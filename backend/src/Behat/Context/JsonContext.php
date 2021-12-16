<?php

namespace App\Behat\Context;

use Behat\Gherkin\Node\PyStringNode;
use Behat\Mink\Exception\ExpectationException;
use Behatch\Context\JsonContext as BehatchJsonContext;
use Coduo\PHPMatcher\PHPMatcher;
use Symfony\Component\PropertyAccess\PropertyAccessor;

/** @author Thibault Richard <thibault@widop.com> */
class JsonContext extends BehatchJsonContext
{
    /**
     * @param PyStringNode $content
     *
     * @throws ExpectationException
     */
    public function theJsonShouldBeEqualTo(PyStringNode $content)
    {
        $expected = $content->getRaw();
        $actual = $this->getJson()->encode();

        $this->matchJson($actual, $expected);
    }

    /**
     * @Then the JSON node :node should match:
     *
     * @param              $node
     * @param PyStringNode $content
     *
     * @throws ExpectationException
     */
    public function theJsonNodeShouldMatchPyString($node, PyStringNode $content) {
        $expected = $content->getRaw();
        $accessor = new PropertyAccessor(false, true);

        $actual = $this->getJson()->read($node, $accessor);

        if (is_array($actual)) {
            foreach ($actual as $item) {
                $this->matchJson(json_encode($item), $expected);
            }
            return;
        }

        $this->matchJson(json_encode($actual), $expected);
    }

    /**
     * @param $actual
     * @param $expected
     *
     * @throws ExpectationException
     */
    public function matchJson($actual, $expected) {
        // Remove all useless whitespaces
        $expected = preg_replace('/\s(?=([^"]*"[^"]*")*[^"]*$)/', '', $expected);

        if (!PHPMatcher::match($actual, $expected, $error)) {
            throw new ExpectationException($error, $this->getSession());
        }
    }
}
