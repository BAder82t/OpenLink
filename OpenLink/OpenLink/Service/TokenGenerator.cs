using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OpenLink.Service
{
    public class TokenGenerator
    {
        public string GenerateToken(Guid userId)
        {
			var mySecret = "asdv234234^>/*^%&68xgsfb2%%%";
			var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));

			var myIssuer = "http://openlinktest.com";
			var myAudience = "http://openlinkaudience.com";

			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenDescriptor = new SecurityTokenDescriptor
            {
				Subject = new ClaimsIdentity(new Claim[]
				{
			new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
				}),
				Expires = DateTime.UtcNow.AddDays(7),
				Issuer = myIssuer,
				Audience = myAudience,
				SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}

		public bool ValidateCurrentToken(string token)
		{
			var mySecret = "asdv234234^>/*^%&68xgsfb2%%%";
			var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));

			var myIssuer = "http://openlinktest.com";
			var myAudience = "http://openlinkaudience.com";
			var tokenHandler = new JwtSecurityTokenHandler();
			try
			{
				tokenHandler.ValidateToken(token, new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidIssuer = myIssuer,
					ValidAudience = myAudience,
					IssuerSigningKey = mySecurityKey
				}, out SecurityToken validatedToken);
			}
			catch
			{
				return false;
			}
			return true;
		}

		public string GenerateRefreshToken()
		{
			var randomNumber = new byte[32];
			using (var rng = RandomNumberGenerator.Create())
			{
				rng.GetBytes(randomNumber);
				return Convert.ToBase64String(randomNumber);
			}
		}

		public static JwtSecurityToken VerifyAndDecodeJwt(string accessToken)
		{
			try
			{
				var myIssuer = "http://openlinktest.com";
				var myAudience = "http://openlinkaudience.com";
				var mySecret = "asdv234234^>/*^%&68xgsfb2%%%";
				var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));
				var tokenHandler = new JwtSecurityTokenHandler();
				var validationParameters = new TokenValidationParameters()
				{
					ValidateIssuerSigningKey = true,
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidIssuer = myIssuer,
					ValidAudience = myAudience,
					IssuerSigningKey = mySecurityKey
				};
				new JwtSecurityTokenHandler().ValidateToken(accessToken, validationParameters, out var validToken);
				// threw on invalid, so...
				return validToken as JwtSecurityToken;
			}
			catch (Exception ex)
			{
				
				return null;
			}
		}

		public static Guid ValidateToken(ControllerBase request)
        {
            
			var header = AuthenticationHeaderValue.Parse(request.Request.Headers["Authorization"]);
			var credentials = header.Parameter;
			JwtSecurityToken token = TokenGenerator.VerifyAndDecodeJwt(credentials);


			var claim = token.Claims;
			var list = claim.ToList();
			var idclaim = list?.FirstOrDefault(x => x.Type.Equals("nameid", StringComparison.OrdinalIgnoreCase))?.Value;
			Guid id = Guid.Parse(idclaim);
			return id;
		}

	}
}
