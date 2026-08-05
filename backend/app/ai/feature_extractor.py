from urllib.parse import urlparse
import re
import ipaddress


def is_ip(domain):
    try:
        ipaddress.ip_address(domain)
        return 1
    except ValueError:
        return 0


def extract_features(url: str):
    parsed = urlparse(url)

    domain = parsed.netloc
    path = parsed.path

    return {
        "url_length": len(url),
        "domain_length": len(domain),
        "path_length": len(path),
        "dot_count": url.count("."),
        "hyphen_count": url.count("-"),
        "underscore_count": url.count("_"),
        "slash_count": url.count("/"),
        "question_count": url.count("?"),
        "equal_count": url.count("="),
        "digit_count": len(re.findall(r"\d", url)),
        "special_char_count": len(re.findall(r"[@#$%^&*]", url)),
        "https": 1 if parsed.scheme == "https" else 0,
        "ip_address": is_ip(domain),
        "subdomain_count": max(len(domain.split(".")) - 2, 0),
    }