using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class RandomNumber
    {
        private readonly ILogger<RandomNumber> _logger;

        public RandomNumber(ILogger<RandomNumber> logger)
        {
            _logger = logger;
        }

        [Function("RandomNumber")]
        public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var random = new Random();
            int randomNumber = random.Next(0, 101);
            _logger.LogInformation($"Generated random number: {randomNumber}");
            return new OkObjectResult("You random number is: " + randomNumber);
        }
    }
}
