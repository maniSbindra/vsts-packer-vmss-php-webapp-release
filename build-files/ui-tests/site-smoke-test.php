<?php
require_once '/usr/lib/selenium/vendor/autoload.php';

class RMTests extends PHPUnit_Framework_TestCase {
	
	
	//p	rotected $siteUrl = "";
	
	
	/**     * @var \RemoteWebDriver     */
	
	protected $webDriver;
	
	protected $url;
	
	public function setUp()
	{
		
		$capabilities = array(\WebDriverCapabilityType::BROWSER_NAME => 'firefox');
		
		$this->webDriver = RemoteWebDriver::create('http://localhost:4444/wd/hub', $capabilities);
		
		$this->testHasParam();
		
	}
	
	
	//p	rotected $url = $siteUrl;
	
	
	public function testHasParam() {
		
		global $argv, $argc;
		
		if($argc <= 2)
		{
			
			fwrite(STDERR,'No Site url passed');
			
		}
		else
		{
			
			$this->url = $argv[2];
			
		}
		
	}
	
	public function testHome()
	{
		
		$this->webDriver->get($this->url);
		
		// 		checking that page title contains word 'GitHub'
		//$		this->assertContains('GitHub', $this->webDriver->getTitle());
		
		//$		AutoSizeAllBtn  = $this->webDriver->findElement(WebDriverBy::xpath('//*[@id="userCommand"]/div[2]/div[2]/btn btn-primary')) ;
		
		
		// 		$AutoSizeAllBtndiv =$this->session->element("css selector", 'div[css="col-md-1"]');
		
		//$		AutoSizeAllBtn = $this->session->element("css selector", 'button[css="btn btn-primary"]');
		
		
		$btnelements = $this->webDriver->findElements(WebDriverBy::className('btn-primary'));
		
		
		
		$btnelements[0]->click();
		
		$btnelements[1]->click();
		
		$selectelements = $this->webDriver->findElements(WebDriverBy::tagName("select"));
		
		
		$allOptions1 = $selectelements[0]->findElements(WebDriverBy::tagName("option"));
		
		
		$allOptions1[1]->click();
		
		$this->assertSame(
		'50',
		$allOptions1[1]->getText()
		);
		
		$this->assertSame(
		'15',
		$allOptions1[0]->getText()
		);
		
		$allOptions2 = $selectelements[1]->findElements(WebDriverBy::tagName("option"));
		
		$allOptions2[1]->click();
		
		
		
	}
	
	
}

?>