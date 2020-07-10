using Microsoft.AspNetCore.Mvc.Routing;

namespace API.Utilities
{
    public class HttpLS : HttpMethodAttribute
    {
        public HttpLS(string template) : base(new string[] { template })
        {

        }
    }
}